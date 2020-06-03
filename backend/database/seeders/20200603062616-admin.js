'use strict';

const bcrypt = require('bcryptjs');

function generateHashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        username: 'Admin',
        email: 'admin@admin.com',
        password: generateHashPassword('admin!@#'),
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
