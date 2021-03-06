import express from "express";
import bodyParser from "body-parser";
import { Models } from "../../data/models";
import Util from "../util";
import * as Routes from "./routes/";

export default function(app) {
	app.get("/", (req, res) => {
		if (!req.sessionID) {
			return res.render("app", {});
		}

		// Get user by session
		Models.users.findOne({ session: req.sessionID })
			.populate("emails")
			.exec()
			.then(userdata => {
				if (!userdata) {
					return res.render("app", {});
				}

				// Only send what is required from the user to the views
				return res.render("app", {
					__store: {
						userdata: {
							loggedIn: true,
							username: userdata.username,
							name: userdata.name
						},
						emails: userdata.emails
					}
				});
			});
	});

	app.post("/login", Routes.login);
	app.post("/register", Routes.register);

	app.post("/api/star", (req, res) => {
		if (typeof req.body._id !== "string") return;

		let id = Util.alphanumeric(req.body._id);

		// Find the specified email
		Models.emails.findOne({ _id: id })
			.populate("_owner")
			.exec()
			.then(email => {
				// Does the requester own this email?
				if (email._owner.session !== req.sessionID) return;

				// Flop the `starred` value and make the update
				email.starred = !email.starred;
				email.save();
			});
	});
};