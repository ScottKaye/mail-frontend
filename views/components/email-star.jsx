import React from "react";
import Icon from "./icon";

export default class EmailStar extends React.Component {
	select = () => {
		this.props.onClick(!this.props.active);
	};

	render() {
		return <span className={ ["email-star", this.props.active && "active"].join(" ") } onClick={ this.select }>
			<Icon icon="star" />
		</span>
	};
}