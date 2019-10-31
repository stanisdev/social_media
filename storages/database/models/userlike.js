'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLike = sequelize.define('UserLike', {
    user_id: DataTypes.INTEGER
  }, {});
  UserLike.associate = function(models) {
    // associations can be defined here
  };
  return UserLike;
};