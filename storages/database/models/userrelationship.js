'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRelationship = sequelize.define('UserRelationship', {
    initiator_id: DataTypes.INTEGER
  }, {});
  UserRelationship.associate = function(models) {
    // associations can be defined here
  };
  return UserRelationship;
};