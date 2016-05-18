import { Models } from "../../../data/models";
import Password from "../../inc/password";
import Util from "../../util";
import Isocrypto from "isocrypto";

function createUser(username, password) {
	return new Promise((resolve, reject) => {
		// Hash password, generate symmetric and asymmetric encryption keys
		let pHash = Password.hash(password);
		let pAKeys = Isocrypto.Asymmetric.generateKeys();
		let pSKey = Isocrypto.Symmetric.generateKey();

		Promise.all([pHash, pAKeys, pSKey ]).then(values => {
			let [ hash, keys, symKey ] = values;

			// Encrypt name with symmetric key, encrypt symmetric key with asymmetric key
			let pEncryptedName = Isocrypto.Symmetric.encrypt(symKey, "John Doe");
			let pEncryptedKey = Isocrypto.Asymmetric.encrypt(keys.public, symKey);

			Promise.all([ pEncryptedName, pEncryptedKey ]).then(values => {
				let [ encryptedName, encryptedKey ] = values;

				// Save to database
				Models.users.create({
					username: username,
					name: {
						sym: encryptedKey,
						value: encryptedName
					},
					password: hash,
					publickey: keys.public
				}, (err, user) => {
					if (err) return reject(err);
					resolve({
						...user,
						privatekey: keys.private
					});
				});
			});
		}).catch(reject);
	});
}

// Update session field in database for user
function updateUserSession(userdata, sessionID) {
	return new Promise((resolve, reject) => {
		userdata.session = sessionID;
		userdata.save();
		resolve();
	});
}

export default function(req, res) {
	let { username, password, confirmPassword } = req.body;
	
	// Loosely detect injections
	if (typeof username !== "string" || typeof password !== "string" || typeof confirmPassword !== "string") {
		return res.send({
			msg: "Invalid login",
			success: false
		});
	}

	// Sanitize
	username = Util.getUsername(username);

	// Do passwords match and meet requirements?
	// TODO requirements
	if (password !== confirmPassword) {
		return res.send({
			msg: "Passwords don't match",
			success: false
		});
	}

	createUser(username, password)
		.then(userdata => {
			// Log the user in
			// TODO test this
			updateUserSession(userdata._doc, req.sessionID)
				.then(() => {
					res.send({
						msg: "Successfully registered in",
						userdata: {
							username: userdata._doc.username,
							name: userdata._doc.name,
							privatekey: userdata.privatekey
						},
						success: true
					})
				});
		})
		.catch(err => {
			res.send({
				msg: "Could not create user: " + err,
				success: false
			});
		});
}