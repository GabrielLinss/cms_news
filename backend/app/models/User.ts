'use strict';

import { Model, DataTypes, Sequelize } from 'sequelize';
import { config } from '../utils/dbConfigAsString';

const sequelize = new Sequelize(config);

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date | null;
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
  }
}, {
  tableName: 'users',
  sequelize: sequelize
});

export default User;
