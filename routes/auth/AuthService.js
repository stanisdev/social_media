'use strict';

const nanoid = require('nanoid/async');

class AuthService {
	constructor(db, mailer) {
		this.db = db;
		this.mailer = mailer;
	}

	resetPassword() {
		this.db.User.findOne({});
	}

	/**
	 * Registartion of new user
	 */
	async register(email) {
		const { UserEmail, ConfirmationCode } = this.db;

		const userEmail = await UserEmail.findOne({
			where: { email }
		});
		if (userEmail instanceof Object) {
			if (Number.isInteger(userEmail.user_id)) {
				throw new Error('The email already used');
			}
			return this.mailer.send(); // Resend confirmation code
		}

		const newUserEmail = UserEmail.build({ email, state: 0 });
		try {
			await newUserEmail.validate();
		} catch {
			throw new Error('Validation failed');
		}

		await newUserEmail.save();
		const code = await nanoid(25);
		await ConfirmationCode.create({
			user_email_id: newUserEmail.id,
			code
		});

		return this.mailer.send(); // Send confirmation code
	}
}

module.exports = AuthService;
