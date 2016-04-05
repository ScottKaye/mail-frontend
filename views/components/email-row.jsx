import React from "react";
import EmailAddress from "./email-address";
import EmailStar from "./email-star";
import Util from "../../lib/util";

class DraggingRow extends React.Component {
	render() {
		return <div>hello</div>
	}
};

export default class EmailRow extends React.Component {
	select = () => {
		this.props.select(this.props.index, !this.props.active);
	};

	star = (starred) => {
		this.props.star(this.props.index, starred);
	};

	dragStart = (e) => {
		let img = new DraggingRow();
		console.log(img.render());
		e.dataTransfer.setDragImage(img.render(), 0, 0);
		console.log(55, e, this);
	};

	render() {
		let [body, truncated] = Util.truncate(this.props.bodyText, 100);

		return <div
				className={ ["email-row", this.props.active && "active"].join(" ") }
				onClick={ this.select }
				draggable="true"
				onDragStart={ this.dragStart }
				>
			<div className="details">
				<h2 className="subject">{ this.props.subject }</h2>
				<span className="addresses">
					<EmailAddress address={ this.props.from } />
				</span>
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