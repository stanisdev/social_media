'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('confirmation_codes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_email_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'user_emails',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			code: {
				type: Sequelize.CHAR(25),
				allowNull: false,
				unique: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('confirmation_codes');
	}
};
