"use strict";

// Allow ES6+ stuff from any files required from this file and beyond
require("babel-register")({
	presets: ["react", "es2015", "stage-0"]
});

const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require("./lib/app/middleware.js").default(app);
require("./lib/app/routes.js").default(app);
require("./lib/app/socket.js").default(io);

app.listen(3000, function() {
	console.log("Listening on port %s", this.address().port);
});