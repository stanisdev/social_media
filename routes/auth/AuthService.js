'use strict';

const { isEmpty } = require('lodash');

class AuthService {
	constructor(db, mailer) {
		this.db = db;
		this.mailer = mailer;
	}

	resetPassword() {
		this.db.User.findOne({});
	}

	/**
	 * Initialization of registration of new user
	 */
	async registrationInit(email) {
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

	/**
	 * Completion of registration
	 */
	async registrationComplete({
		firstName,
		lastName,
		birthDate,
		gender,
		password,
		code
	}) {
		const { User, ConfirmationCode } = this.db;

		const confirmCode = await ConfirmationCode.findOne({
			where: { code }
		});
		if (!(confirmCode instanceof Object)) {
			throw new Error('Wrong confirmation code');
		}

		const user = User.build({
			first_name: firstName,
			birth_date: birthDate,
			gender,
			password,
			state: 1
		});
		if (!isEmpty(lastName)) {
			user.set('last_name', lastName);
		}

		await user.cryptPassword();
		await user.setUid();

		try {
			await user.validate();
		} catch (err) {
			throw new Error(err); // @todo: add more adequate handler
		}

		// await user.save();
		// @todo: use transaction within several additional actions
	}
}

module.exports = AuthService;
