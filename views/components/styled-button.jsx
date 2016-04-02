import React from "react";
import Icon from "./icon";
import Tooltip from "./fab-tooltip";

export default class StyledButton extends React.Component {
	render() {
		return <Tooltip text={ this.props.tooltip }>
			<button className="btn-material" onClick={ this.props.onClick }>
				<Icon icon={ this.props.icon } />
			</button>
		</Tooltip>
	};
}