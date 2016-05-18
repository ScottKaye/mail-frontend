import React from "react";
import ReactDOM from "react-dom";
import App from "./views/app";

ReactDOM.render(
	React.createElement(App, {
		__store: window.__store
	}),
	document.body.querySelector("#react-root"),
	() => {
		// Enable animations
		// This prevents animations from firing more than once while React re-renders the page
		document.body.classList.remove("frozen");
	}
);