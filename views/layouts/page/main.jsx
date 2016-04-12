import React from "react";
import * as Screens from "~/lib/inc/screens";
import { AppBar, AppBarCollection } from "~/views/components/appbar";
import Base from "~/views/layouts/base";
import EmailFull from "~/views/components/email-full";
import EmailRow from "~/views/components/email-row";
import FloatingActionButton from "~/views/components/fab";
import Search from "~/views/components/search";
import SideBar from "~/views/components/sidebar";
import StyledButton from "~/views/components/styled-button";
import { ComposeScreen, EmailScreen, HomeScreen, ManageScreen, PreferencesScreen } from "~/views/layouts/content/";

export default class MainPage extends React.Component {
	constructor(props) {
		super(props);

		// Save the list of all emails for this user
		this.allEmails = props.userdata.emails;

		this.state = {
			userdata: props.userdata,  // Pass userdata down as data to the client
			emails: this.allEmails,
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

		// Update database
		fetch("/api/star", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			credentials: "same-origin",
			method: "post",
			body: JSON.stringify({ _id: this.state.emails[index]._id })
		});
	};

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
					<AppBarCollection>
						<item active={ this.state.screen === Screens.home } onClick={ this.home }>Home</item>
						<Search provider={ this.provider } search={ this.search } />
					</AppBarCollection>
					<AppBarCollection align="right">
						<item>{ this.props.userdata.name }</item>
					</AppBarCollection>
				</AppBar>
				<section className="pane-content">
					<div className="pane-emails">
						{
							this.state.emails.map((email, i) => {
								return <EmailRow
									email={ email._doc ? email._doc : email } // If it's a mongoose collection, get the actual document
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