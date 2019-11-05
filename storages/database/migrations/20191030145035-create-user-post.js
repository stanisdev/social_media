"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      content: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TINYINT.UNSIGNED // all - null, friends only - 0, me only - 1
      },
      likes_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      comments_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      users_sharing_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      attachments: {
        type: Sequelize.JSON
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserPosts");
  }
};
