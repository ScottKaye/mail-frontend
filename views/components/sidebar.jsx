import React from "react";
import Icon from "./icon";

class SidebarItem extends React.Component {
	render() {
		return <li onClick={ this.props.onClick } className={ this.props.active && "active" }>
			<Icon icon={ this.props.icon } />
			{ this.props.children }
		</li>
	}
}

export default class SideBar extends React.Component {
	render() {
		return <nav className="nav-sidebar">
			<aside>
				<Icon icon="email" /> Kaye.Family Mail
			</aside>
			<ul>
				{
					React.Children.map(this.props.children, (item, i) => {
						switch(item.type) {
							case "header":
								return <li key={ i } className="list-header">{ item.props.children }</li>
							case "item":
								return <SidebarItem
										key={ i }
										onClick={ item.props.onClick }
										active={ item.props.active }
										icon={ item.props.icon }
									>
									{ item.props.children}
								</SidebarItem>
								break;
						}
					})
				}
			</ul>
		</nav>
	};
}