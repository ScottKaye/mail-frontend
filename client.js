import React from "react";
import ReactDOM from "react-dom";
import App from "~/views/app";

const unpack = JSON.parse;

//Get data from server, which is passed down through the x-data element
//It is base64 encoded JSON
let props = { };
let xData = document.body.querySelector("x-data");
if (xData) {
	let json = unpack(xData.innerHTML);
	Object.assign(props, json);
}

//All pages will export an App class which renders the current page 
ReactDOM.render(
	React.createElement(App, props),
	document.body.querySelector("#react-root")
);