import React from "react";
import { MainPage, LoginPage } from "./layouts/page/";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MailStore from "../lib/reducers/";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.store = createStore(MailStore, props.__store);
		this.store.subscribe(this.render);
	};

	componentDidMount() {
		console.log("MOUNTED");
	};

	render() {
		console.log("Rendering");

		return <Provider store={ this.store }>
			{
				this.props.userdata
					? <MainPage userdata={ this.props.userdata } />
					: <LoginPage userdata={ this.props.userdata } />
			}
		</Provider>
	};
};