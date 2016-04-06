import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

const mongoSession = MongoDBStore(session);
const store = new mongoSession({ 
	uri: "mongodb://localhost/mail_session",
	collection: "sessions"
});

export default function(app) {
	// Catch errors 
	store.on("error", function(error) {
		assert.ifError(error);
		assert.ok(false);
	});

	app.use(session({
		secret: "This is a secret",
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7
		},
		store: store,
		resave: true,
		saveUninitialized: true
	}));
};