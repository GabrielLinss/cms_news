'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'role_id',
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'roles'
        },
        onDelete: 'SET NULL'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return;
  }
};
