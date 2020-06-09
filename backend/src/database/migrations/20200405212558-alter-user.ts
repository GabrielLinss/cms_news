'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.addColumn('users', 'role_id', {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      key: 'id',
      model: 'roles'
    },
    onDelete: 'SET NULL'
  });
}
export function down(queryInterface: QueryInterface, Sequelize: any) {
  return;
}
