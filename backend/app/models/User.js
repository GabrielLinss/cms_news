const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
  }
}

module.exports = User;
