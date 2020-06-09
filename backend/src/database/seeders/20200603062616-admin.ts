'use strict';

import { genSaltSync, hashSync } from 'bcryptjs';
import { QueryInterface } from 'sequelize';

function generateHashPassword(password: string) {
  let salt = genSaltSync(10);
  return hashSync(password, salt);
}

export function up(queryInterface: QueryInterface, Sequelize: any) {
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
}
export function down(queryInterface: QueryInterface, Sequelize: any) { return queryInterface.bulkDelete('users', {}); }
