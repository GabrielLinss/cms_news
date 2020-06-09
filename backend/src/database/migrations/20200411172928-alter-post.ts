'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.addColumn('posts', 'main_image', {
    allowNull: false,
    type: Sequelize.STRING
  });
}
export function down(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.removeColumn('posts', 'main_image');
}
