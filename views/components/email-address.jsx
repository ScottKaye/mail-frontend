import React from "react";

export default class EmailAddress extends React.Component {
	render() {
		let [, user, domain] = this.props.address.match(/^(.+?)@(.+?)$/);
		return <span className="email-address-full">
			<span className="email-user">{ user }</span>
			@
			<span className="email-domain">{ domain }</span>
		</span>
	};
}