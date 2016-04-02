import React from "react";
import EmailAddress from "./email-address";
import EmailStar from "./email-star";
import Util from "../../lib/util";

export default class EmailRow extends React.Component {
	select = () => {
		this.props.select(this.props.index, !this.props.active);
	};

	star = (starred) => {
		this.props.star(this.props.index, starred);
	};

	render() {
		let [body, truncated] = Util.truncate(this.props.bodyText, 100);

		return <div className={ ["email-row", this.props.active && "active"].join(" ") } onClick={ this.select }>
			<div className="details">
				<span className="subject">{ this.props.subject }</span>
				<span className="from"><EmailAddress address={ this.props.from } /></span>
				<div className="options">
					<EmailStar active={ this.props.starred } onClick={ this.star } />
				</div>
			</div>
			<div className="body">
				{ body }
				{ truncated && <span className="ellipses">&hellip;</span> }
			</div>
		</div>
	};
}