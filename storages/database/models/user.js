'use strict';

const bcrypt = require('bcrypt');
const nanoid = require('nanoid/async');
const nanoidGenerate = require('nanoid/async/generate');
const saltRounds = 10; // @todo: move to config

module.exports = (sequelize, DataTypes) => {
	const { Sequelize, models } = sequelize;
	const Model = Sequelize.Model;

	class User extends Model {
		async cryptPassword() {
			const salt = await nanoid(5);
			const hash = await bcrypt.hash(this.password + salt, saltRounds);
			this.password = hash;
			this.salt = salt;
		}

		async setUid() {
			for (let i = 0; i < 10; i++) {
				const uid = await nanoidGenerate('1234567890', 11);
				const user = await User.findOne({
					where: { uid },
					attributes: ['id']
				});
				if (!(user instanceof Object)) {
					this.uid = uid;
					return;
				}
			}
			throw new Error('Unexpected error. The uid value cannot be generated.');
		}
	}

	User.init(
		{
			uid: {
				type: Sequelize.BIGINT.UNSIGNED,
				allowNull: false,
				validate: {
					isInt: true
				}
			},
			first_name: {
				type: Sequelize.STRING,
				validate: {
					min: 1,
					max: 70
				}
			},
			middle_name: {
				type: Sequelize.STRING,
				validate: {
					min: 1,
					max: 70
				}
			},
			last_name: {
				type: Sequelize.STRING,
				validate: {
					min: 1,
					max: 70
				}
			},
			birth_date: {
				type: Sequelize.DATE
			},
			phone: {
				type: Sequelize.BIGINT.UNSIGNED,
				validate: {
					isInt: true
				}
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					len: 60
				}
			},
			salt: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					len: 5
				}
			},
			state: {
				type: Sequelize.TINYINT.UNSIGNED,
				allowNull: false,
				validate: {
					isInt: true,
					min: 0
				}
			},
			gender: {
				type: Sequelize.BOOLEAN, // true - M, false - W
				validate: {
					isIn: [[true, false]]
				}
			},
			country: {
				type: Sequelize.STRING,
				validate: {
					max: 100,
					min: 1
				}
			},
			city: {
				type: Sequelize.STRING,
				validate: {
					max: 100,
					min: 1
				}
			},
			last_visit: {
				type: Sequelize.DATE
			}
		},
		{
			sequelize,
			modelName: 'User'
		}
	);

	return User;
};
