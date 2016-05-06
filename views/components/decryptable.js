import React from "react";
import Isocrypto from "isocrypto";

// ASCII ! (33) to ~ (126), difference 93
const nonsenseRange = 93;
const nonsenseChars = Array(nonsenseRange).fill(0).map((c, i) => String.fromCharCode(i + 33));

// An absolutely meaningless number
const encryptionGuessFactor = 16;

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

		this.state = {
			value: props.value,
			randomText: nonsense(props.value.length / encryptionGuessFactor),
			decrypted: false
		};
	};

	componentDidMount() {
		let privkey = localStorage.privkey;
		if (!privkey) return;
		
		// Animate fake "decryption" because it looks super cool
		this.anim = setInterval(this.randomize.bind(this, this.props.value.length / encryptionGuessFactor), 100);

		Isocrypto.Symmetric.decrypt(privkey, this.state.value)
			.then(val => {
				clearInterval(this.anim);

				this.setState({
					value: val,
					decrypted: true
				});

				if (this.props.onComplete) {
					this.props.onComplete(val);
				}
			})
			.catch(err => {
				console.error("decryption error", err);
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