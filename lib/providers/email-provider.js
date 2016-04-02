class Email {

}

export default class EmailProvider {
	constructor() {

	}

	getEmails(config) {
		return [{
			from: "pgreviews@gmail.com",
			to: "scott@kaye.family",
			subject: "Wow!",
			bodyText: "Hey, nice email system!",
			body: "Hey, nice email system!",
			starred: false,
		}, {
			from: "gaben@valvesoftware.com",
			to: "scott@kaye.family",
			subject: "Steamworks HL3 Developer Program",
			bodyText: "Hi Kredit,\n\nYou've been accepted to join the Valve Steamworks HL3 Developer Program.  In this program you will be responsible",
			body: "Hi Kredit,<br><br>You've been accepted to join the Valve Steamworks HL3 Developer Program.  In this program you will be responsible",
			starred: true,
		}];
	}
}