import { Model, DataTypes } from 'sequelize';

class Post extends Model {
  static init(connection) {
    super.init({
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      content: DataTypes.TEXT,
      main_image: DataTypes.STRING
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    this.belongsToMany(models.Tag, { foreignKey: 'post_id', through: 'tags_posts', as: 'tags' });
    this.hasMany(models.Image, { foreignKey: 'post_id', as: 'images' });
  }
}

export default Post;
