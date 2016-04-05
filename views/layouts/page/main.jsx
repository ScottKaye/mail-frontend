import * as Screens from "../../../lib/inc/screens";
import AppBar from "../../components/appbar";
import Base from "../base";
import EmailFull from "../../components/email-full";
import EmailProvider from "../../../lib/providers/email-provider";
import EmailRow from "../../components/email-row";
import FloatingActionButton from "../../components/fab";
import React from "react";
import Search from "../../components/search";
import SideBar from "../../components/sidebar";
import StyledButton from "../../components/styled-button";
import { ComposeScreen, EmailScreen, HomeScreen, ManageScreen, PreferencesScreen } from "../content/";

export default class MainPage extends React.Component {
	constructor(props) {
		super(props);

		this.provider = new EmailProvider();
		this.state = {
			emails: this.provider.getEmails({
				account: "scott"
			}),
			activeEmail: null,
			activeMailbox: null,
			screen: Screens.home
		};
	};

	preferences = () => {
		this.setState({
			activeEmail: null,
			screen: Screens.preferences
		});
	};

	compose = () => {
		this.setState({
			activeEmail: null,
			screen: Screens.compose
		});
	};

	home = () => {
		this.setState({
			activeEmail: null,
			screen: Screens.home
		});
	};

	setEmailActive = (index, active) => {
		if (active) {
			this.setState({
				activeEmail: index,
				screen: Screens.email
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
			case Screens.email:
				return <EmailScreen
					email={ this.state.emails[this.state.activeEmail] } 
					index={ this.state.activeEmail }
					star={ this.setEmailStarred }
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
		return <Base data={ this.state }>
			<SideBar>
				<header>Mailboxes</header>
				<item icon="inbox" active>Inbox</item>
				<header>Categories</header>
				<item icon="archive">Archive</item>
				<item icon="block">Spam</item>
			</SideBar>
			<div className="pane-main">
				<AppBar>
					<item active={ this.state.screen === Screens.home } onClick={ this.home }>Home</item>
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
	}
}