'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.addColumn('posts', 'category_id', {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      key: 'id',
      model: 'categories'
    },
    onDelete: 'SET NULL'
  });
}
export function down(queryInterface: QueryInterface, Sequelize: any) {
  return;
}
