'use strict';

module.exports = (sequelize, DataTypes) => {
	const { Sequelize, models } = sequelize;
	const { Model, Op } = Sequelize;

	class UserPost extends Model {
		setState(state) {
			switch (state) {
				case 0: // null -> All
					break;
				case 1:
					this.state = 0; // Friends
					break;
				case 2:
					this.state = 1; // Only me
					break;
				default:
					throw new Error('Unacceptable state value');
			}
		}
	}

	UserPost.init(
		{
			uid: {
				type: Sequelize.BIGINT.UNSIGNED,
				allowNull: false,
				validate: {
					isInt: true
				}
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
					min: 1
				}
			},
			content: {
				type: Sequelize.TEXT,
				validate: {
					min: 1
				}
			},
			state: {
				type: Sequelize.TINYINT.UNSIGNED,
				validate: {
					isInt: true,
					min: 0
				}
			},
			likes_count: {
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
					min: 1
				}
			},
			comments_count: {
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
					min: 1
				}
			},
			users_sharing_count: {
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
					min: 1
				}
			},
			attachments: {
				type: Sequelize.JSON
			}
		},
		{
			sequelize,
			modelName: 'UserPost'
		}
	);

	const { User } = models;
	User.hasMany(UserPost);
	UserPost.belongsTo(User);

	return UserPost;
};
