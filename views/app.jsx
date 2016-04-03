import React from "react";
import { MainPage, LoginPage } from "./layouts/page/";

export default class App extends React.Component {
	render() {
		// If logged in
		// TODO
		if (1 == 1) {
			return <MainPage />
		}
		else {
			return <LoginPage />
		}
	};
}