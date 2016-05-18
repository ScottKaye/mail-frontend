import React from "react";
import { MainPage, LoginPage } from "./layouts/page/";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MailStore from "../lib/reducers/";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		if (props.__store) {
			this.store = createStore(MailStore, props.__store);
		}
		else {
			this.store = createStore(MailStore);
		}
	};

	componentDidMount() {
		console.log("MOUNTED");
	};

	render = () => {
		let gState = this.store.getState();
		return <Provider store={ this.store }>
			{
				gState.userdata.loggedIn
					? <MainPage />
					: <LoginPage />
			}
		</Provider>
	};
};