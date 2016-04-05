import React from "react";
import Icon from "./icon";

class SidebarItem extends React.Component {
	state = {
		draggingOver: false,
		dragCompleted: false
	};

	// Dragged element has been dropped onto this element
	drop = (e) => {
		this.setState({
			draggingOver: false,
			dragCompleted: true
		});

		setTimeout(() => {
			this.setState({
				dragCompleted: false
			});
		}, 500);
	};

	// Dragged element is over this element
	dragOver = (e) => {
		if (e.preventDefault) e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		this.setState({
			draggingOver: true
		});
	};

	// Dragged element has left this element's layout box
	dragLeave = (e) => {
		this.setState({
			draggingOver: false
		});
	};

	render() {
		return <li
					onClick={ this.props.onClick }
					className={ [
						this.props.active && "active",
						this.state.draggingOver && "over",
						this.state.dragCompleted && "dropped"
					].join(" ") }
					onDrop={ this.drop }
					onDragOver={ this.dragOver }
					onDragLeave={ this.dragLeave }
				>
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