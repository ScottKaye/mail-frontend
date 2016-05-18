import React from "react";
import Isocrypto from "isocrypto";

// ASCII ! (33) to ~ (126), difference 93
const nonsenseRange = 93;
const nonsenseChars = Array(nonsenseRange).fill(0).map((c, i) => String.fromCharCode(i + 33));

// An absolutely meaningless number
const encryptionGuessFactor = 6;

function nonsense(len) {
	len = len > 10 ? len | 0 : 10;

	let result = [];
	while (len--) {
		result.push(<span key={ len } className={ Math.random() < 0.5 ? "alt" : "" }>{ nonsenseChars[(Math.random() * nonsenseRange) | 0] }</span>);
	}
	return result;
}

export default class Decryptable extends React.Component {
	constructor(props) {
		super(props);

		// Can't decrypt anything if a symmetric key and value aren't given
		if (!props.sym || !props.value) {
			console.log("props are", props);
			throw Error("Sym or value not set");
			return;
		}

		this.state = {
			sym: "",
			value: "",
			randomText: nonsense(props.value.length / encryptionGuessFactor),
			decrypted: false
		};
	};

	componentDidMount() {
		// Animate fake "decryption" because it looks super cool
		this.anim = setInterval(this.randomize.bind(this, this.state.value.length / encryptionGuessFactor), 100);

		let privatekey = localStorage.privatekey;
		if (!privatekey) return;

		// Decrypt symmetric key
		Isocrypto.Asymmetric.decrypt(privatekey, this.props.sym).then(key => {
			// Decrypt data with symmetric key
			console.log("got symmetric");
			Isocrypto.Symmetric.decrypt(key, this.props.value).then(val => {
				console.log("done");
				// TODO remove delay, this is for testing when decryption blocks the main thread
				setTimeout(() => {
					clearInterval(this.anim);

					this.setState({
						value: val,
						decrypted: true
					});

					if (this.props.onComplete) {
						this.props.onComplete(val);
					}
				}, Math.random() * 2000);
			})
			.catch(err => {
				console.error("Decryption error", err);
			});
		});
	};

	randomize = (len) => {
		this.setState({
			randomText: nonsense(len)
		});
	};

	render() {
		if (this.state.decrypted) {
			return <span className="decryptable done">{ this.state.value }</span>;
		}
		else {
			return <span className="decryptable working">{ this.state.randomText }</span>;
		}
	};
};