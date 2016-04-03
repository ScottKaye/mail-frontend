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
			body: "Hey, nice email system!<br><br>- Scott",
			type: "plain",
			starred: false,
		}, {
			from: "gaben@valvesoftware.com",
			to: "scott@kaye.family",
			subject: "Steamworks HL3 Developer Program",
			bodyText: "Hi Kredit,\n\nYou've been accepted to join the Valve Steamworks HL3 Developer Program.  In this program you will be responsible",
			body: "Hi Kredit,<br><br>You've been accepted to join the Valve Steamworks HL3 Developer Program.  In this program you will be responsible for testing our up-and-coming title, Half-Life 3.",
			type: "html",
			starred: true,
		}];
	}
}