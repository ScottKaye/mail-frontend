const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
	session: String,
	name: String,
	username: String,
	password: String,
	emails: [{ type: Schema.Types.ObjectId, ref: "email" }]
});

const EmailSchema = new Schema({
	_owner: { type: Schema.Types.ObjectId, ref: "user" },
	headers: [String],
	from: String,
	to: String,
	subject: String,
	bodyText: String,
	body: String,
	type: String,
	starred: Boolean,
});

export const Models = {
	users: mongoose.model("user", UserSchema),
	emails: mongoose.model("email", EmailSchema)
};