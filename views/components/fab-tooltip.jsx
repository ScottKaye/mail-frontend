import React from "react";

export default class Tooltip extends React.Component {
	render() {
		if (!this.props.text) return <div>{ this.props.children }</div>;

		return <div className="tooltip" data-tooltip={ this.props.text }>
			{ this.props.children }
		</div>
	};
}