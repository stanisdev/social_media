'use strict';
module.exports = (sequelize, DataTypes) => {
	const UserEmail = sequelize.define(
		'UserEmail',
		{
			user_id: DataTypes.INTEGER
		},
		{}
	);
	UserEmail.associate = function(models) {
		// associations can be defined here
	};
	return UserEmail;
};
