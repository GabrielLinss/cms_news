'use strict';

import { BelongsToGetAssociationMixin,
         Model, DataTypes, Sequelize, HasManyGetAssociationsMixin,
         Association, HasManyCountAssociationsMixin } from 'sequelize';

import { config } from '../utils/dbConfigAsString';
import Role from './Role';
import Post from './Post';

const sequelize = new Sequelize(config);

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date | null;

  public getPosts!: HasManyGetAssociationsMixin<Post>;
  public countPosts!: HasManyCountAssociationsMixin;

  public getRole!: BelongsToGetAssociationMixin<Role>;

  public static associations: {
    posts: Association<User, Post>;
    role: Association<User, Role>;
  };
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      key: 'id',
      model: 'Role'
    },
    onDelete: 'SET NULL'
  },
}, {
  tableName: 'users',
  sequelize: sequelize
});

User.belongsTo(Role, { targetKey: 'id' });

User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'posts'
});

export default User;
