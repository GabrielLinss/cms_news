const { Model, DataTypes } = require('sequelize');

class Token extends Model {
  static init(connection) {
    super.init({
      token: DataTypes.STRING,
      is_revoked: DataTypes.BOOLEAN
    }, {
      sequelize: connection
    });
  }
}

module.exports = Token;
