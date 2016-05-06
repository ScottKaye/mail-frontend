import React from "react";
import EmailAddress from "./email-address";
import EmailStar from "./email-star";
import Util from "../../lib/util";
import Decryptable from "./decryptable";

class DraggingRow extends React.Component {
	render() {
		return <div>hello</div>
	};
};

class EmailPreview extends React.Component {
	state = {
		text: this.props.text,
		encrypted: this.props.encrypted,
		truncated: false
	};

	decrypted = text => {
		let [cut, wasTruncated] = Util.truncate(text, 100);

		this.setState({
			text: cut,
			truncated: wasTruncated,
			encrypted: false
		});
	};

	render() {
		if (this.state.encrypted) {
			return <Decryptable value={ this.props.text } onComplete={ this.decrypted } />
		}
		else {
			return <span>
				{ this.state.text }
				{ this.state.truncated && <span className="ellipses">&hellip;</span> }
			</span>
		}
	};
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
		return <div
				className={ ["email-row", this.props.active && "active"].join(" ") }
				onClick={ this.select }
				draggable="true"
				onDragStart={ this.dragStart }
				>
			<div className="details">
				<h2 className="subject">
					<Decryptable value={ this.props.email.subject } />
				</h2>
				<span className="addresses">
					<EmailAddress address={ this.props.email.from } encrypted />
				</span>
				<div className="options">
					<EmailStar active={ this.props.email.starred } onClick={ this.star } />
				</div>
			</div>
			<div className="body">
				<EmailPreview text={ this.props.email.bodyText } encrypted />
			</div>
		</div>
	};
};