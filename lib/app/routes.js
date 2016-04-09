import express from "express";
import subdomain from "express-subdomain";
import settings from "../../config/settings";
import { Models } from "../../data/models";

import Password from "../../lib/inc/password";
(async function() {
	let hash = await Password.hash("supersecret");
	let check = await Password.check("supersecret", hash);
	console.log("hash: ", hash);
	console.log("check: ", check);
})();

const api = express.Router();

export default function(app) {
	app.use(subdomain("api", api));

	app.get("/", (req, res) => {
		// Get user by session
		Models.user.findOne({ session: req.sessionID })
			.exec()
			.then(userdata => {
				// userdata will be null if no user was found, which will display the login screen
				res.render("app", { userdata: userdata });
			});
	});

	api.get("/", (req, res) => {
		res.send({
			data: [1, 2, 3, 4, 5]
		});
	});
};