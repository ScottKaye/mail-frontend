import React from "react";
import { connect } from "react-redux";
import * as Screens from "../../../lib/inc/screens";
import { AppBar, AppBarCollection } from "../../components/appbar";
import Base from "../base";
import EmailFull from "../../components/email-full";
import EmailRow from "../../components/email-row";
import FloatingActionButton from "../../components/fab";
import Search from "../../components/search";
import SideBar from "../../components/sidebar";
import StyledButton from "../../components/styled-button";
import Decryptable from "../../components/decryptable";
import { ComposeScreen, EmailScreen, HomeScreen, ManageScreen, PreferencesScreen } from "../content/";

class MainPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			screen: Screens.home
		};
	};

	static contextTypes = {
		store: React.PropTypes.object
	};

	// Screen changes
	preferences = () => this.setState({ screen: Screens.preferences });
	compose = () => this.setState({ screen: Screens.compose });
	home = () => this.setState({ screen: Screens.home });

	search = (value) => {
		if (value.length) {
			// Search for emails and update list
			let matchingEmails = this.allEmails.filter(e => {
				return Object.keys(e)
					.filter(k => e[k].toLowerCase)
					.some(k => {
						// TODO way better search
						let v = e[k];
						return v.toLowerCase().includes(value.toLowerCase());
					});
			});

			this.setState({
				emails: matchingEmails,
				screen: Screens.none
			});
		}
		else {
			// Clear search results, go back to main view
			this.setState({
				emails: this.allEmails,
				activeEmail: null,
				screen: Screens.email
			});
		}
	};

	screen() {
		switch(this.state.screen) {
			case Screens.email:
				return <EmailScreen
					email={ this.state.emails[this.state.activeEmail] } 
					index={ this.state.activeEmail }
				/>
			case Screens.home:
				return <HomeScreen />
			case Screens.manage:
				return <ManageScreen />
			case Screens.preferences:
				return <PreferencesScreen />
			case Screens.compose:
				return <ComposeScreen />
		}
	};

	render() {
		return <Base>
			<SideBar>
				<header>Mailboxes</header>
				<item icon="inbox" active>Inbox</item>
				<header>Categories</header>
				<item icon="archive">Archive</item>
				<item icon="block">Spam</item>
			</SideBar>
			<div className="pane-main">
				<AppBar>
					<AppBarCollection>
						<item active={ this.state.screen === Screens.home } onClick={ this.home }>Home</item>
						<Search provider={ this.provider } search={ this.search } />
					</AppBarCollection>
					<AppBarCollection align="right">
						<item><Decryptable sym={ this.props.userdata.name.sym } value={ this.props.userdata.name.value } /></item>
					</AppBarCollection>
				</AppBar>
				<section className="pane-content">
					<div className="pane-emails">
						{
							this.props.emails.map((email, i) => {
								return <EmailRow
									email={ email._doc ? email._doc : email } // If it's a mongoose collection, get the actual document
									key={ i }
									index={ i }
									active={ this.state.activeEmail === i }
									/>
							})
						}
					</div>
					<div className="pane-full">{ this.screen() }</div>
				</section>
				<FloatingActionButton>
					<StyledButton icon="settings" tooltip="Preferences" onClick={ this.preferences } />
					<StyledButton icon="plus-circle" tooltip="Compose" onClick={ this.compose } />
				</FloatingActionButton>
			</div>
		</Base>
	};
};

export default connect(state => {
	return {
		userdata: state.userdata,
		emails: state.emails
	};
})(MainPage);