'use strict';

const nanoid = require('nanoid/async');

module.exports = (sequelize, DataTypes) => {
	const { Sequelize } = sequelize;
	const Model = Sequelize.Model;

	class ConfirmationCode extends Model {
		static findByUserEmailId(id) {
			return this.findOne({
				where: {
					user_email_id: id
				},
				attributes: ['code']
			});
		}

		static generateCode() {
			return nanoid(25);
		}
	}

	ConfirmationCode.init(
		{
			user_email_id: {
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
					min: 1
				}
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					len: 25
				}
			}
		},
		{
			sequelize,
			modelName: 'ConfirmationCode',
			timestamps: false
		}
	);

	return ConfirmationCode;
};
