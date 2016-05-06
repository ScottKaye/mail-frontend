import React from "react";
import Data from "../data";
import IsServer from "../../lib/inc/is-server";

export default class Base extends React.Component {
	render() {
		return IsServer() ? (
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
	};
};