'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.bulkInsert('categories', [
    {
      name: 'Sem categoria',
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}
export function down(queryInterface: QueryInterface, Sequelize: any) { return queryInterface.bulkDelete('categories', {}); }
