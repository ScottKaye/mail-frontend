import React from "react";

export class AppBarCollection extends React.Component {
	render() {
		return <ul>
			{
				React.Children.map(this.props.children, (item, i) => {
					if (item.type === "item") {
						return <li key={ i } className={ item.props.active ? "active" : "" } onClick={ item.props.onClick }>
							{ item.props.children }
						</li>
					}
					return item;
				})
			}
		</ul>
	}
}

export class AppBar extends React.Component {
	render() {
		return <nav className="nav-appbar">{ this.props.children }</nav>
	};
}