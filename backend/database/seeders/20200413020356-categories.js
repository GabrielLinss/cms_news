'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('categories', 
    [
      {
        name: 'Sem categoria',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('categories', null, {}),
};
