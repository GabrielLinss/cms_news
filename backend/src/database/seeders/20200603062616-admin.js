'use strict';

const { genSaltSync, hashSync } = require('bcryptjs');

function generateHashPassword(password) {
  let salt = genSaltSync(10);
  return hashSync(password, salt);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'Admin',
        email: 'admin@admin.com',
        password: generateHashPassword('admin!@#'),
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
