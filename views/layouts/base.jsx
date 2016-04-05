import React from "react";
import Data from "../data";

export default class Base extends React.Component {
	constructor() {
		super();

		//Determine if this component is being rendered on the server
		//Accessing window from the server will throw an error, so it is caught silently
		this.isServer = true;
		try {
			this.isServer = window === undefined
						 && window.document === undefined;
		}
		catch (e) { }
	}
	
	render() {
		return this.isServer ? (
			<html lang="en">
				<head>
					<meta charSet="UTF-8" />
					<title>{ this.props.title || "Home" } - Mail</title>
					<link rel="stylesheet" href="/static/style/themes/dark.scss" />
				</head>
				<body>
					<Data data={ this.props.data } />
					<section id="react-root">
						<main>
							{ this.props.children }
						</main>
					</section>
					<script src="/static/js/bundle.js" />
				</body>
			</html>
		) : <main>{ this.props.children }</main>
	}
}