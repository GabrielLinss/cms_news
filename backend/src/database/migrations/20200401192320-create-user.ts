'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.createTable('users', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
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
  return queryInterface.dropTable('users');
}
