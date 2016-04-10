import compression from "compression";
import helmet from "helmet";
import scss from "express-compile-sass";
import express from "express";
import bodyParser from "body-parser";

export default function(app) {
	app.set("views", "./views");
	app.set("view engine", "jsx");
	app.engine("jsx", require("express-react-views").createEngine({
		//beautify: true,
		transformViews: false
	}));

	app.use(scss({
		root: "./",
		sourceMap: true,
		sourceComments: true,
		watchFiles: true
	}));
	app.use(helmet());
	app.use(compression());

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use("/static", express.static("./static"));
};