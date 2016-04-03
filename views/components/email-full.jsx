import React from "react";
import EmailAddress from "./email-address";
import EmailStar from "./email-star";

export default class EmailFull extends React.Component {
	star = (starred) => {
		this.props.star(this.props.index, starred);
	};

	render() {
		if (this.props.index === null) return <div></div>;

		return <div className={ ["email-full", "type-" + this.props.type].join(" ") }>
			<div className="details">
				<h1 className="subject">{ this.props.subject }</h1>
				<span className="addresses">
					<EmailAddress address={ this.props.from } />
				</span>
				<div className="options">
					<EmailStar index={ this.props.index } active={ this.props.starred } onClick={ this.star } />
				</div>
			</div>
			<div className="body" dangerouslySetInnerHTML={{__html: this.props.body }} />
		</div>
	};
}