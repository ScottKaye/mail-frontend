"use strict";

// Allow ES6+ stuff from any files required from this file and beyond
require("babel-register")({
	presets: ["react", "es2015", "stage-0"]
});

require("babel-polyfill");

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const chalk = require("chalk");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.listen(3000, function() {
	console.log(chalk.green("HTTP server listening on port " + this.address().port));
});

mongoose.connect("mongodb://localhost/mail", err => {
	console.log(err ? chalk.red(err) : chalk.green("DB is ready."));
});

require("./lib/app/mailin");
require("./lib/app/sessions").default(app); // Must be above middleware
require("./lib/app/middleware").default(app);
require("./lib/app/routes").default(app);
require("./lib/app/socket").default(io);