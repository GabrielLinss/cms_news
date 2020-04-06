'use strict';

import { Model, DataTypes, Sequelize, HasManyGetAssociationsMixin,
         HasManyCountAssociationsMixin, 
         Association} from 'sequelize';

import { config } from '../utils/dbConfigAsString';
import User from './User';

const sequelize = new Sequelize(config);

class Role extends Model {
  public id!: number;
  public type!: string;

  // timestamps
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date | null;

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public countUsers!: HasManyCountAssociationsMixin;

  public static associations: {
    users: Association<Role, User>;
  };
}

Role.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: new DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'roles',
  sequelize: sequelize
});

Role.hasMany(User, {
  sourceKey: 'id',
  foreignKey: 'role_id',
  as: 'users'
});

export default Role;
