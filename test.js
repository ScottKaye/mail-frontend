"use strict";

require("babel-register")({
	presets: ["react", "es2015", "stage-0"]
});

require("babel-polyfill");

var Encryption = require("~/lib/inc/encryption.js").default;

let keys = Encryption.generateKey();
console.log(keys);
Encryption.encrypt(keys.public, "Scott Kaye").then(enc => {
	console.log("Encrypted", enc);
	Encryption.decrypt(keys.private, enc).then(dec => {
		console.log("Decrypted", dec);
	}).catch(err => {
		console.log("dec err", err);
	});
}).catch(err => {
	console.log("Error", err);
});