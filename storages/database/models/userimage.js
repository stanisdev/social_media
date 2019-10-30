'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define('UserImage', {
    user_id: DataTypes.INTEGER
  }, {});
  UserImage.associate = function(models) {
    // associations can be defined here
  };
  return UserImage;
};