import React from "react";
import Base from "./layouts/base";
import AppBar from "./components/appbar";
import SideBar from "./components/sidebar";
import FloatingActionButton from "./components/fab";
import StyledButton from "./components/styled-button";
import EmailProvider from "../lib/providers/email-provider";
import EmailRow from "./components/email-row";
import EmailFull from "./components/email-full";

const screens = {
	email: 1,
	preferences: 2
};

export default class App extends React.Component {
	constructor(props) {
		super(props);

		let provider = new EmailProvider();
		this.state = {
			emails: provider.getEmails({
				account: "scott"
			}),
			activeEmail: null,
			screen: screens.email
		};
	};

	preferences = () => {
		console.log("prefs");
	};

	compose = () => {
		console.log("compose");
	};

	setEmailActive = (index, active) => {
		if (active) {
			this.setState({
				activeEmail: index
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

	render() {
		return <Base data={ this.state }>
			<SideBar>
				<header>Mailboxes</header>
				<item icon="inbox" active>Inbox</item>
				<item icon="block">Spam</item>
			</SideBar>
			<div className="pane-main">
				<AppBar>
					<item active>Test</item>
					<item>Test</item>
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
					<div className="pane-full">
						{
							<EmailFull
								{...this.state.emails[this.state.activeEmail] }
								index={ this.state.activeEmail }
								star={ this.setEmailStarred } 
							/>
						}
					</div>
				</section>
				<FloatingActionButton>
					<StyledButton icon="settings" tooltip="Preferences" onClick={ this.preferences } />
					<StyledButton icon="plus-circle" tooltip="Compose" onClick={ this.compose } />
				</FloatingActionButton>
			</div>
		</Base>
	};
}