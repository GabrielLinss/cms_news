const { Model, DataTypes } = require('sequelize');

class Tag extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsToMany(models.Post, { foreignKey: 'tag_id', through: 'tags_posts', as: 'posts' });
  }
}

module.exports = Tag;
