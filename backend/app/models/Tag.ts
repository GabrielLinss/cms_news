'use strict';

import { Model, DataTypes, Sequelize, BelongsToManyGetAssociationsMixin,
         BelongsToManyCountAssociationsMixin, Association } from 'sequelize';
         
import { config } from '../utils/dbConfigAsString';
import Post from './Post';

const sequelize = new Sequelize(config);

class Tag extends Model {
  public id!: number;
  public name!: string;

  // timestamps
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date | null;

  public getPosts!: BelongsToManyGetAssociationsMixin<Post>;
  public countPosts!: BelongsToManyCountAssociationsMixin;

  public static associations: {
    posts: Association<Tag, Post>;
  };
}

Tag.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'tags',
  sequelize: sequelize
});

Tag.belongsToMany(Post, { through: 'tags_posts' });

export default Tag;
