'use strict';

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
		const userEmail = await UserEmail.findByEmail(email);

		/**
		 * Email found
		 */
		if (userEmail instanceof Object) {
			if (Number.isInteger(userEmail.user_id)) {
				throw new Error('The email already used'); // @todo: do not response such error
			}
			const confirmCode = await ConfirmationCode.findByUserEmailId(
				userEmail.id
			);

			let code;
			if (!(confirmCode instanceof Object)) {
				// If record does not exist then create code
				code = await ConfirmationCode.generateCode();
				await ConfirmationCode.create({
					user_email_id: userEmail.id,
					code
				});
			} else {
				code = confirmCode.code;
			}
			return this.mailer.send(email, { code }); // Resend confirmation code
		}

		/**
		 * Expected way
		 */
		const newUserEmail = UserEmail.build({ email, state: 0 });
		try {
			await newUserEmail.validate();
		} catch {
			throw new Error('Validation failed');
		}

		await newUserEmail.save();
		const code = await ConfirmationCode.generateCode();
		await ConfirmationCode.create({
			user_email_id: newUserEmail.id,
			code
		});

		return this.mailer.send(email, { code }); // Send confirmation code
	}
}

module.exports = AuthService;
