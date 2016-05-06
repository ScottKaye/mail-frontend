import mailin from "mailin";
import fs from "fs";
import chalk from "chalk";

import Util from "../util";

mailin.start({
	port: 25,
	disableWebhook: true
});

// Message received
mailin.on("message", (connection, data, content) => {
	// Find accounts this email is sending to
	let usernames = Util.getUsernames(data.to.map(to => to.address));

	// Save attachments to data folder
	if (data.attachments.length > 0) {
		data.attachments.forEach(attachment => {
			// TODO encryption
			fs.writeFile(`data/attachments/${ attachment.contentId }`, attachment.content, attachment.transferEncoding, err => {
				if (err) {
					console.log(chalk.red("Error saving attachment: ", err));
				}
			});
		});
	}

	console.log(usernames);
});