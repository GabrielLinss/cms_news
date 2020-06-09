'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags_posts', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'posts'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      tag_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'tags'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags_posts');
  }
};
