import React from "react";
import { MainPage, LoginPage } from "~/views/layouts/page/";

export default class App extends React.Component {
	render() {
		if (this.props.userdata) {
			return <MainPage userdata={ this.props.userdata } />
		}

		return <LoginPage userdata={ this.props.userdata } />
	};
};