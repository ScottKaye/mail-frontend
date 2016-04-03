import React from "react";
import Base from "./layouts/base";
import { ComposeScreen, EmailScreen, HomeScreen, ManageScreen, PreferencesScreen } from "./layouts/content/";
import { MainPage, LoginPage } from "./layouts/page/";
import AppBar from "./components/appbar";
import SideBar from "./components/sidebar";
import FloatingActionButton from "./components/fab";
import StyledButton from "./components/styled-button";
import EmailProvider from "../lib/providers/email-provider";
import EmailRow from "./components/email-row";
import EmailFull from "./components/email-full";
import Search from "./components/search";

// Enum
const screens = {
	email: 1,
	preferences: 2,
	home: 3,
	manage: 4,
	compose: 5
};

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.provider = new EmailProvider();
		this.state = {
			emails: this.provider.getEmails({
				account: "scott"
			}),
			activeEmail: null,
			activeMailbox: null,
			screen: screens.home
		};
	};

	preferences = () => {
		console.log("prefs");
	};

	compose = () => {
		console.log("compose");
	};

	home = () => {
		console.log("home");
		this.setState({
			activeEmail: null,
			screen: screens.home
		});
	};

	setEmailActive = (index, active) => {
		if (active) {
			this.setState({
				activeEmail: index,
				screen: screens.email
			});
		}
	};

	setEmailStarred = (index, starred) => {
		let newEmails = this.state.emails.slice(0);
		newEmails[index].starred = starred;
		this.setState({
			emails: newEmails
		});
	};

	screen() {
		switch(this.state.screen) {
			case screens.email:
				return <EmailScreen
					email={ this.state.emails[this.state.activeEmail] } 
					index={ this.state.activeEmail }
					star={ this.setEmailStarred }
				/>
			case screens.home:
				return <HomeScreen />
			case screens.manage:
				return <ManageScreen />
			case screens.preferences:
				return <PreferencesScreen />
			case screens.compose:
				return <ComposeScreen />
		}
	}

	render() {
		return <Base data={ this.state }>
			<SideBar>
				<header>Mailboxes</header>
				<item icon="inbox" active>Inbox</item>
				<item icon="block">Spam</item>
			</SideBar>
			<div className="pane-main">
				<AppBar>
					<item active={ this.state.screen === screens.home } onClick={ this.home }>Home</item>
					<Search provider={ this.provider } />
				</AppBar>
				<section className="pane-content">
					<div className="pane-emails">
						{
							this.state.emails.map((email, i) => {
								return <EmailRow
									{ ...email }
									key={ i }
									index={ i }
									active={ this.state.activeEmail === i }
									select={ this.setEmailActive }
									star={ this.setEmailStarred }
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
}