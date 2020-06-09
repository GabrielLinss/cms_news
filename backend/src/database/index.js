import {Sequelize} from 'sequelize';
import dbConfig from '../config/database';

import User from '../app/models/User';
import Tag from '../app/models/Tag';
import Role from '../app/models/Role';
import Post from '../app/models/Post';
import Category from '../app/models/Category';
import Token from '../app/models/Token';
import Image from '../app/models/Image';

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

export default connection;
