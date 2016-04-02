import React from "react";
import Icon from "./icon";

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
								return <li key={ i } onClick={ item.props.onClick } className={ item.props.active ? "active" : "" }>
									<Icon icon={ item.props.icon } />{ item.props.children}
								</li>
								break;
						}
					})
				}
			</ul>
		</nav>
	};
}