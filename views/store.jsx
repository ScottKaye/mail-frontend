import React from "react";

export default class Store extends React.Component {
	static contextTypes = {
		store: React.PropTypes.object
	};

	render() {
		const { store } = this.context;
		let strStore = JSON.stringify(store.getState());

		return <script dangerouslySetInnerHTML={{ __html: `window.__store = ${ strStore || "{}" }` }} />
	};
};