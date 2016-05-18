import React from "react";
import EmailAddress from "./email-address";
import EmailStar from "./email-star";
import Util from "../../lib/util";
import Decryptable from "./decryptable";

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
			return <Decryptable sym={ this.props.sym } value={ this.props.text } onComplete={ this.decrypted } />
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

	};

	render() {
		return <div
				className={ `email-row ${ this.props.active && "active" }` }
				onClick={ this.select }
				>
			<div className="details">
				<h2 className="subject">
					<Decryptable sym={ this.props.email.sym } value={ this.props.email.subject } />
				</h2>
				<span className="addresses">
					<EmailAddress sym={ this.props.email.sym } address={ this.props.email.from } encrypted />
				</span>
				<div className="options">
					<EmailStar email={ this.props.email } />
				</div>
			</div>
			<div className="body">
				<EmailPreview sym={ this.props.email.sym } text={ this.props.email.bodyText } encrypted />
			</div>
		</div>
	};
};