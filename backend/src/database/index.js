const {Sequelize} = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Tag = require('../app/models/Tag');
const Role = require('../app/models/Role');
const Post = require('../app/models/Post');
const Category = require('../app/models/Category');
const Token = require('../app/models/Token');
const Image = require('../app/models/Image');

const connection = new Sequelize(dbConfig);

User.init(connection);
Tag.init(connection);
Role.init(connection);
Post.init(connection);
Category.init(connection);
Token.init(connection);
Image.init(connection);

User.associate(connection.models);
Tag.associate(connection.models);
Role.associate(connection.models);
Post.associate(connection.models);
Category.associate(connection.models);
Image.associate(connection.models);

module.exports = connection;
