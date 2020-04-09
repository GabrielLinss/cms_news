'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts', 'category_id',
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'categories'
        },
        onDelete: 'SET NULL'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return;
  }
};
