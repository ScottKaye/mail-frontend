import React from "react";
import Store from "../store";
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
				<body className="frozen">
					<section id="react-root">
						<main>
							{ this.props.children }
						</main>
					</section>
					<Store />
					<script src="/static/js/bundle.js" />
				</body>
			</html>
		) : <main>{ this.props.children }</main>
	};
};