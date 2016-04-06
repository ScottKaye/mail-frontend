import express from "express";
import subdomain from "express-subdomain";
import settings from "../../config/settings";

const api = express.Router();

export default function(app) {
	app.use(subdomain("api", api));

	app.get("/", (req, res) => {
		res.render("app", {
			session: req.session
		});
	});

	api.get("/", (req, res) => {
		res.send({
			data: [1, 2, 3, 4, 5]
		});
	});
};