'use strict';

module.exports = (sequelize, DataTypes) => {
	const { Sequelize } = sequelize;
	const Model = Sequelize.Model;
	class ConfirmationCode extends Model {}

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
