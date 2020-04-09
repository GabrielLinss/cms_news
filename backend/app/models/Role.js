const { Model, DataTypes } = require('sequelize');

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

module.exports = Role;
