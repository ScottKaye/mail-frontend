import React from "react";
import jsonpack from "jsonpack";

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
					<link rel="stylesheet" href="/static/style/base.scss" />
				</head>
				<body>
					{
						//If data is to be passed into the view, encode it as JSON and insert it into a hidden element
						this.props.data &&
							<x-data>{ jsonpack.pack(this.props.data) }</x-data>
					}
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