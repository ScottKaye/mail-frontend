import React from "react";

// TODO better pack
const pack = JSON.stringify;

export default class Data extends React.Component {
	render() {
		if (!this.props.data) return <x-data />

		return <x-data dangerouslySetInnerHTML={{ __html: pack(this.props.data) }}/>
	}
}