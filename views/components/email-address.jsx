import React from "react";
import Decryptable from "./decryptable";

export default class EmailAddress extends React.Component {
	state = {
		address: this.props.address,
		encrypted: this.props.encrypted
	};

	decrypted = address => {
		this.setState({
			address: address,
			encrypted: false
		});
	};

	render() {
		if (this.state.encrypted) {
			return <Decryptable value={ this.props.address } onComplete={ this.decrypted } />
		}
		else {
			let [, user, domain] = this.state.address.match(/^(.+?)@(.+?)$/);
			return <span className="email-address-full">
				<span className="email-user">{ user }</span>
				@
				<span className="email-domain">{ domain }</span>
			</span>
		}
	};
};