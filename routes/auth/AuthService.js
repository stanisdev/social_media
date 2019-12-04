'use strict';

const { isEmpty } = require('lodash');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');

/**
 * Class for processing all kind of user's authorization acts
 */
class AuthService {
	constructor({ db, mailer, config, auxiliaryTools, dataDistributor }) {
		this.db = db;
		this.mailer = mailer;
		this.config = config;
		this.auxiliaryTools = auxiliaryTools;
		this.dataDistributor = dataDistributor;
	}

	async resetPassword() {
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
			throw Boom.badRequest('User validation error');
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
			throw Boom.badRequest('Wrong confirmation code');
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
		user.set('uid', await this.auxiliaryTools.generateUid('User'));

		try {
			await user.validate();
		} catch (error) {
			this.db.logError(error);
			throw Boom.badRequest('User validation error');
		}

		await user.assertRegistration(confirmCode);
	}

	/**
	 * Login user by getting JWT token
	 */
	async login({ email, password }) {
		const user = await this.dataDistributor.findUserByEmail(email);
		if (!(user instanceof Object)) {
			throw Boom.badRequest('Wrong email/password');
		}
		if (user.state < 1) {
			throw new Error('You did not confirm the email'); // @todo: replace by another construction
		}
		const isValid = await user.checkPassword(password);
		if (!isValid) {
			throw Boom.badRequest('Wrong email/password');
		}

		const token = await JWT.sign(
			{
				id: user.id,
				name: user.first_name
			},
			this.config.auth.secret
		);
		user.setLastVisit(); // it should not be awaited
		return token;
	}
}

module.exports = AuthService;
