'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          key: 'id',
          model: 'Post'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      tag_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          key: 'id',
          model: 'Tag'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags_posts');
  }
};
