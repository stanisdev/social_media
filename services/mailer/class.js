'use strict';

const nodemailer = require('nodemailer');

class Mailer {
	constructor(config) {
		this.transporter = nodemailer.createTransport(config);
	}

	async send(email, options) {
		/**
    try {
			let info = await this.transporter.sendMail({
				from: 'Social media <media.5ocial@yandex.ru>',
				to: 'd39065@urhen.com',
				subject: 'Caption',
				html: '<b>Test message</b>'
			});
			console.log('Message sent: %s', info.messageId);
		} catch (error) {
			console.log(error);
		}
     */
	}
}

module.exports = Mailer;
