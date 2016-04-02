import React from "react";
import Icon from "./icon";

export default class FloatingActionButton extends React.Component {
	render() {
		return <label className="floating-action-button">
			<input type="checkbox" />
			<Icon icon={ this.props.icon || "plus" } />
			<ul>
				{
					this.props.children.map((btn, i) => <li key={ i }>{ btn }</li>)
				}
			</ul>
		</label>
	}
}