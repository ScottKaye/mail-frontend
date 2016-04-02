import React from "react";
import EmailAddress from "./email-address";
import EmailStar from "./email-star";

export default class EmailFull extends React.Component {
	star = (starred) => {
		this.props.star(this.props.index, starred);
	};

	render() {
		if (this.props.index === null) return <div></div>;

		return <div className="email-full">
			<div className="details">
				<span className="subject">{ this.props.subject }</span>
				<span className="from"><EmailAddress address={ this.props.from } /></span>
				<EmailStar index={ this.props.index } active={ this.props.starred } onClick={ this.star } />
			</div>
			<div className="body" dangerouslySetInnerHTML={{__html: this.props.body }} />
		</div>
	};
}