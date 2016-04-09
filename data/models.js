const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	session: String,
	name: String,
	username: String,
	password: String
});

export const Models = {
	user: mongoose.model("user", UserSchema)
};