import React from "react";
import { MainPage, LoginPage } from "./layouts/page/";

export default class App extends React.Component {
	render() {
		//let auth = this.props.session.loggedIn;

		if (true || auth) {
			return <MainPage session={ this.props.session } />
		}

		return <LoginPage session={ this.props.session } />
	};
};