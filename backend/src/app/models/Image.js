const { Model, DataTypes } = require('sequelize');

class Image extends Model {
  static init(connection) {
    super.init({
      legend: DataTypes.STRING,
      size: DataTypes.FLOAT,
      key: DataTypes.STRING,
      url: DataTypes.STRING
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}

module.exports = Image;
