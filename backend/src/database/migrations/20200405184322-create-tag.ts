'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.createTable('tags', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
  return queryInterface.dropTable('tags');
}
