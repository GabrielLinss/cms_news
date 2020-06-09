'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.createTable('tokens', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    is_revoked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
}
export function down(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.dropTable('tokens');
}
