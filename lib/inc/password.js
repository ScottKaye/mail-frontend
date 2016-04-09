import bcrypt from "bcrypt";
import { saltRounds } from "../../config/settings";

export default class Password {
	static hash(plain) {
		return new Promise((resolve, reject) => {
			bcrypt.hash(plain, saltRounds, (err, hash) => {
				if (err) return reject(err);

				resolve(hash);
			});
		});
	};

	static check(plain, hash) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(plain, hash, (err, res) => {
			    if (err) return reject(erro);

			    resolve(res);
			});
		});
	};
}