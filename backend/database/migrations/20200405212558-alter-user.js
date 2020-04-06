'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.alterTable('users', {
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          key: 'id',
          model: 'Role'
        },
        onDelete: 'SET NULL'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return;
  }
};
