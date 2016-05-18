import mailin from "mailin";
import fs from "fs";
import chalk from "chalk";
import Util from "../util";
import Isocrypto from "isocrypto";
import { Models } from "../../data/models";

mailin.start({
	port: 25,
	disableWebhook: true
});

// Message received
mailin.on("message", (connection, data, content) => {
	// Find accounts this email is sending to
	let usernames = data.to.map(to => Util.getUsername(to.address));

	// Raw to emails
	let tos = data.envelopeTo.map(to => to.address);

	usernames.forEach(username => {

		// Get user information and a new symmetric key
		let pUserdata = Models.users.findOne({ username: username }).exec();
		let pSymKey = Isocrypto.Symmetric.generateKey();

		Promise.all([ pUserdata, pSymKey ]).then(values => {
			// TODO catch-all address
			let [ userdata, symkey ] = values;

			// Save attachments to data folder
			if (data.attachments.length > 0) {
				data.attachments.forEach(attachment => {
					// TODO encryption
					/*fs.writeFile(`data/attachments/${ attachment.contentId }`, attachment.content, attachment.transferEncoding, err => {
						if (err) {
							console.log(chalk.red("Error saving attachment: ", err));
						}
					});*/
				});
			}

			// Encrypt fields
			let pSubject = Isocrypto.Symmetric.encrypt(symkey, data.subject);
			let pLanguage = Isocrypto.Symmetric.encrypt(symkey, data.language);
			let pText = Isocrypto.Symmetric.encrypt(symkey, data.text);
			let pHtml = Isocrypto.Symmetric.encrypt(symkey, data.html);
			let pFrom = Isocrypto.Symmetric.encrypt(symkey, data.envelopeFrom.address);
			let pTo = Promise.all(tos.map(to => Isocrypto.Symmetric.encrypt(symkey, to)));
			let pDate = Isocrypto.Symmetric.encrypt(symkey, `${ +data.date }`);
			let pHeaders = Isocrypto.Symmetric.encrypt(symkey, JSON.stringify(data.headers));
			let pEncSymKey = Isocrypto.Asymmetric.encrypt(userdata.publickey, symkey);

			Promise.all([ pSubject, pLanguage, pText, pHtml, pFrom, pTo, pDate, pHeaders, pEncSymKey ]).then(values => {
				let [ eSubject, eLanguage, eText, eHtml, eFrom, eTo, eDate, eHeaders, eEncSymKey ] = values;

				Models.emails.create({
					_owner: userdata._id,
					attachments: [],
					headers: eHeaders,
					from: eFrom,
					to: eTo,
					subject: eSubject,
					bodyText: eText,
					bodyHtml: eHtml,
					starred: false,
					sym: eEncSymKey,
					dkim: data.dkim !== "failed",
					spf: data.spf !== "failed",
					spamScore: data.spamScore,
					language: eLanguage,
					priority: data.priority,
					date: eDate
				}, (err, savedEmail) => {
					// TODO log errors
					console.log('saved email id is', savedEmail._id);
					userdata.emails.push(savedEmail._id);
					userdata.save();
				});
			});
		});
	});
});