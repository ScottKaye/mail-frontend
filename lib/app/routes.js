import express from "express";
import settings from "../../config/settings";

const main = express.Router();
const api = express.Router();

export default function(app) {
	app.use(main);
	app.use(api);

	main.get("/", (req, res) => {
		res.render("app");
	});

	api.get("/", (req, res) => {
		res.send({
			data: [1, 2, 3, 4, 5]
		});
	});
};