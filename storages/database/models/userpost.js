"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPost = sequelize.define(
    "UserPost",
    {
      user_id: DataTypes.INTEGER
    },
    {}
  );
  UserPost.associate = function(models) {
    // associations can be defined here
  };
  return UserPost;
};
