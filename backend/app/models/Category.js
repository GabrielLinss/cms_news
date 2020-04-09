const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'category_id', as: 'posts' });
  }
}

module.exports = Category;
