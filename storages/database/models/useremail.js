'use strict';

module.exports = (sequelize, DataTypes) => {
	const { Sequelize, models } = sequelize;
	const Model = Sequelize.Model;

	class UserEmail extends Model {
		static findByEmail(email) {
			return this.findOne({
				where: { email },
				attributes: ['id', 'user_id']
			});
		}
	}

	UserEmail.init(
		{
			user_id: {
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
					min: 1
				}
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
					min: 6,
					max: 70
				}
			},
			/**
			 * 0 - created, not confirmed
			 * 1 - confirmed
			 */
			state: {
				type: Sequelize.TINYINT.UNSIGNED,
				allowNull: false,
				validate: {
					isInt: true,
					min: 0,
					max: 255
				}
			}
		},
		{
			sequelize,
			modelName: 'UserEmail',
			timestamps: false
		}
	);

	const { ConfirmationCode } = models;
	UserEmail.hasOne(ConfirmationCode);
	ConfirmationCode.belongsTo(UserEmail);

	return UserEmail;
};
