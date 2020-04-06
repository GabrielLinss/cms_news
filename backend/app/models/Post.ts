'use strict';

import { Model, DataTypes, Sequelize, BelongsToGetAssociationMixin,
         Association, BelongsToManyGetAssociationsMixin } from 'sequelize';
         
import { config } from '../utils/dbConfigAsString';
import User from './User';
import Tag from './Tag';
import Category from './Category';

const sequelize = new Sequelize(config);

class Post extends Model {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public subtitle!: string;
  public content!: string;

  // timestamps
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date | null;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public getCategory!: BelongsToGetAssociationMixin<Category>;
  public getTags!: BelongsToManyGetAssociationsMixin<Tag>;

  public static associations: {
    user: Association<Post, User>;
    category: Association<Post, Category>;
    tags: Association<Post, Tag>;
  };
}

Post.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      key: 'id',
      model: 'User'
    },
    onDelete: 'SET NULL'
  },
  title: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  subtitle: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'posts',
  sequelize: sequelize
});

Post.belongsTo(User, { targetKey: 'id' });

Post.belongsTo(Category, { targetKey: 'id' });

Post.belongsToMany(Tag, { through: 'tags_posts' });

export default Post;
