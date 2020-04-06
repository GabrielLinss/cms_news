'use strict';

import { Model, DataTypes, Sequelize, Association, HasManyGetAssociationsMixin, HasManyCountAssociationsMixin } from 'sequelize';
import { config } from '../utils/dbConfigAsString';
import Post from './Post';

const sequelize = new Sequelize(config);

class Category extends Model {
  public id!: number;
  public name!: string;

  // timestamps
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date | null;

  public getPosts!: HasManyGetAssociationsMixin<Post>;
  public countPosts!: HasManyCountAssociationsMixin;

  public static associations: {
    posts: Association<Category, Post>;
  };
}

Category.init({
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
  tableName: 'categories',
  sequelize: sequelize
});

Category.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'category_id',
  as: 'posts'
});

export default Category;
