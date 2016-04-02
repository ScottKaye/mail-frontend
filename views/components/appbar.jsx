import React from "react";

export default class AppBar extends React.Component {
	render() {
		return <nav className="nav-appbar">
			<ul>
				{
					React.Children.map(this.props.children, (item, i) => {
						return <li key={ i } className={ item.props.active ? "active" : "" }>
							{ item.props.children }
						</li>
					})
				}
			</ul>
		</nav>
	};
}