import crypto from "crypto";

const isClient = typeof window !== "undefined";

export default class Encryption {
	generateKeys() {
		return new Promise((resolve, reject) => {
			if (isClient) {
				window.crypto.subtle.generateKey({
					name: "ECDH",
					namedCurve: "P-256"
				}, true, ["deriveKey"]).then(keys => {
					window.crypto.subtle.exportKey("jwk", keys.privateKey).then(jwk => {
						let { d, x, y } = jwk;

						resolve({
							public: x + y,
							private: d + x + y
						});
					});
				});
			}
			else {

			}
		});
	};

	encrypt(pubKey, cleartext) {
		// Extract x and y from public key
		let [ x, y ] = key.match(/.{1,43}/g);

		return new Promise((resolve, reject) => {
			if (isClient) {
				window.crypto.subtle.importKey("jwk", {
					crv: "P-256",
					ext: true,
					key_ops: ["deriveKey"],
					kty: "EC",
					x: x,
					y: y
				}, {
					name: "ECDH",
					namedCurve: "P-256"
				}, true, ["deriveKey"]).then(key => {
					window.crypto.subtle.deriveKey({
						name: "ECDH",
						namedCurve: "P-256",
						public: key
					})
				});
			}
		});
	};

	decrypt(privKey, encrypted) {

	};
};