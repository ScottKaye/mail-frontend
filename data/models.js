const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
	session: String,
	name: {
		sym: String,
		value: String
	},
	username: String,
	password: String,
	publickey: String,
	emails: [{ type: Schema.Types.ObjectId, ref: "email" }]
});

export const EmailSchema = new Schema({
	_owner: { type: Schema.Types.ObjectId, ref: "user" },
	attachments: [{ type: Schema.Types.ObjectId, ref: "attachment" }],
	headers: String,
	from: String,
	to: [String],
	subject: String,
	bodyText: String,
	bodyHtml: String,
	type: String,
	starred: Boolean,
	sym: String,
	dkim: Boolean,
	spf: Boolean,
	spamScore: Number,
	language: String,
	priority: String,
	date: String,
});

export const AttachmentSchema = new Schema({
	_owner: { type: Schema.Types.ObjectId, ref: "email" },
	filename: String,
	checksum: String,
	key: String
});

export const Models = {
	users: mongoose.model("user", UserSchema),
	emails: mongoose.model("email", EmailSchema),
	attachments: mongoose.model("attachments", AttachmentSchema)
};