import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

const mongoSession = MongoDBStore(session);
const store = new mongoSession({ 
	uri: "mongodb://localhost/mail",
	collection: "sessions"
});

export default function(app) {
	// Catch errors 
	store.on("error", function(error) {
		assert.ifError(error);
		assert.ok(false);
	});

	app.use(session({
		secret: String.raw`t8{-[h7B+U>1*?s'8+1N73.8/"k8,}*Pe1E%&]j08G.^:</5[3M]J++3)~L2t]ce`,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7
		},
		store: store,
		resave: true,
		saveUninitialized: true
	}));
};