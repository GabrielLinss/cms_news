'use strict';

import { QueryInterface } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: any) {
  return queryInterface.createTable('tags_posts', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'posts'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    tag_id: {
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'tags'
      },
      onDelete: 'CASCADE',
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
  return queryInterface.dropTable('tags_posts');
}
