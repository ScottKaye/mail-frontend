import React from "react";
import EmailFull from "../../components/email-full";

export default class EmailScreen extends React.Component {
	render() {
		return <EmailFull
			{...this.props.email }
			index={ this.props.index }
			star={ this.props.star } 
		/>
	}
}