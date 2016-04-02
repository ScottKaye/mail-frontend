import React from "react";

export default class Icon extends React.Component {
	render() {
		if (!this.props.icon) {
			console.log("Error: no icon specified.");
			return <i className="zmdi zmdi-block" />
		}

		return <i className={
			["zmdi", "zmdi-" + this.props.icon].join(" ")
		} />
	};
}