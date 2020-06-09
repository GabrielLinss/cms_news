import { Model, DataTypes } from 'sequelize';

class Role extends Model {
  static init(connection) {
    super.init({
      type: DataTypes.STRING
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'role_id', as: 'users' });
  }
}

export default Role;
