'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.alterTable('posts', {
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          key: 'id',
          model: 'Category'
        },
        onDelete: 'SET NULL'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return;
  }
};
