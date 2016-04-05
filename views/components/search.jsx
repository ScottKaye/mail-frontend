import React from "react";

export default class Search extends React.Component {
	state = {
		content: ""
	};

	keyup = (e) => {
		this.setState({
			content: e.target.value
		});

		// If enter key was pressed
		if (e.which === 13) {
			this.props.search(this.state.content);
		}
	};

	render() {
		return <input className="search-field" placeholder="Search" onKeyUp={ this.keyup } />
	}
}