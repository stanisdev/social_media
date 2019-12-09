'use strict';

module.exports = (sequelize, DataTypes) => {
	const { Sequelize, models } = sequelize;
	const { Model, Op } = Sequelize;

	class UserLike extends Model {}

	UserLike.init(
		{
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					isInt: true
				}
			},
			user_post_id: {
				type: Sequelize.INTEGER,
				validate: {
					isInt: true
				}
			},
		},
		{
			sequelize,
			modelName: 'UserLike',
			timestamps: false
		}
	);

	return UserLike;
};
