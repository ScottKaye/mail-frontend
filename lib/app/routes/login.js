import { Models } from "../../../data/models";
import Password from "../../inc/password";
import Util from "../../util";

function checkUser(username, password) {
	return new Promise((resolve, reject) => {
		Models.users.findOne({ username: username })
			.exec()
			.then(userdata => {
				if (!userdata) {
					return reject();
				}

				// Check password
				Password.check(password, userdata.password)
					.then(match => match ? resolve(userdata) : reject())
			});
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
	let { username, password } = req.body;
	
	// Loosely detect injections
	if (typeof username !== "string" || typeof password !== "string") {
		return res.send({
			msg: "Invalid login",
			success: false
		});
	}

	// Sanitize
	username = Util.getUsername(username);

	// Are the credentials valid?
	checkUser(username, password)
		.then(userdata => {
			// Log the user in
			updateUserSession(userdata, req.sessionID)
				.then(() => {
					res.send({
						msg: "Successfully logged in",
						userdata: {
							username: userdata.username,
							name: userdata.name,
						},
						success: true
					})
				})
				.catch(err => {
					res.send({
						msg: "Credentials correct, but failed to log in",
						success: false
					});
				});
		})
		.catch(err => {
			res.send({
				msg: "Incorrect login",
				success: false
			});
		});
}