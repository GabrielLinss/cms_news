'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('roles', 
    [
      {
        type: 'User',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'Admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {}),
};
