import rsa from "node-rsa";

const types = {
	public: "pkcs1-public-der",
	private: "pkcs1-private-pem"
};

export default class Encryption {
	// Create a public and private key
	static createPair() {
		let key = new rsa();
		key.generateKeyPair();

		return {
			public: key.exportKey(types.public),
			private: key.exportKey(types.private)
		};
	};

	// Encrypt data with a public key
	static async encrypt(pub, data) {
		// TODO make this async/threaded?
		return new Promise(resolve => {
			let key = new rsa();
			key.importKey(pub, types.public);

			resolve(key.encrypt(data, "buffer"));
		});
	};

	// Decrypt data with a private key
	static async decrypt(priv, data) {
		// TODO make this async/threaded?
		return new Promise(resolve => {
			let key = new rsa();
			key.importKey(priv, types.private);

			resolve(key.decrypt(data, "utf8"));
		});
	};
};