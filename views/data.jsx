import React from "react";
import jsonpack from "jsonpack";

export default class Data extends React.Component {
	render() {
		if (!this.props.data) return <x-data />

		return <x-data>{ jsonpack.pack(this.props.data) }</x-data>
	}
}