'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.bulkInsert('roles', [
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
  ], {});
}
export function down(queryInterface: QueryInterface, Sequelize: any) { return queryInterface.bulkDelete('roles', {}); }
