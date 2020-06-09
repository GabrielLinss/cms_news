import Post from '../models/Post';
import Image from '../models/Image';
import Tag from '../models/Tag';
import Category from '../models/Category';
import AWS from 'aws-sdk';
import { Op } from 'sequelize';
import convertMonth from '../utils/convertMonth';

class PostController {
  async index(req, res) {
    try {
      let { page = 1, limit = 5, category_name } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const offset = (page - 1) * limit;

      let posts;

      if (category_name) {
        const category = await Category.findOne({ where: { name: category_name } });

        posts = await Post.findAndCountAll({
          where: { category_id: category.id },
          limit,
          offset,
          order: [['id', 'DESC']],
          include: [{ association: 'user' },
          { association: 'category' },
          { association: 'tags' }]
        });
      } else {
        posts = await Post.findAndCountAll({
          limit,
          offset,
          order: [['id', 'DESC']],
          include: [{ association: 'user' },
          { association: 'category' },
          { association: 'tags' }]
        });
      }

      let total

      if (category_name) {
        const category = await Category.findOne({ where: { name: category_name } });
        total = await Post.count({ where: { category_id: category.id } });
      } else {
        total = await Post.count();
      }

      const data = {
        total,
        perPage: limit,
        lastPage: Math.ceil(total / limit),
        page,
        data: posts.rows
      };

      return res.json(data);
    } catch(error) {
      console.log(error);
      return res.status(500).json([{ message: 'Server error' }]);
    }
  }

  async indexByDate(req, res) {
    try {
      let { page = 1, limit = 5, month } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const offset = (page - 1) * limit;

      month = convertMonth(month);

      const year = new Date().getFullYear();
      const date = new Date(year, month, 1);
      const date2 = new Date(year, month, 30);

      const posts = await Post.findAndCountAll({
        where: { created_at: { [Op.gte]: date, [Op.lt]: date2 } },
        limit,
        offset,
        order: [['id', 'DESC']],
        include: [{ association: 'user' },
        { association: 'category' },
        { association: 'tags' }]
      });

      const total = await Post.count({ where: { created_at: { [Op.gte]: date, [Op.lt]: date2 } } });

      const data = {
        total,
        perPage: limit,
        lastPage: Math.ceil(total / limit),
        page,
        data: posts.rows
      };

      return res.json(data);
    } catch(error) {
      console.log(error);
      return res.status(500).json([{ message: 'Server error' }]);
    }
  }

  async store(req, res) {
    try {
      let { tags, ...data } = req.body;

      let separatedAndCreatedTags = [];

      if (tags && tags.length > 0) {
        let arrayTags = tags.split(',');

        for (let tag of arrayTags) {
          tag = tag.trim();
          let t = await Tag.findOne({ where: { name: { [Op.like]: '%' + tag } } });

          if (!t) {
            t = await Tag.create({ name: tag });
            separatedAndCreatedTags.push(t.id);
          } else {
            separatedAndCreatedTags.push(t.id);
          }
        }
      }

      const { location } = req.file;
      data.main_image = location;

      let post = await Post.create(data);

      if (separatedAndCreatedTags && separatedAndCreatedTags.length > 0) {
        await post.setTags(separatedAndCreatedTags);
      }

      post = await Post.findByPk(post.id, {
        include: [{ association: 'user' },
        { association: 'category' },
        { association: 'tags' }]
      });

      return res.status(201).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json([{ message: 'Server error' }]);
    }
  }

  async show(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [{ association: 'user' }, { association: 'category' },
        { association: 'tags' }, { association: 'images' }]
      });

      if (!post) return res.status(404).json([{ message: 'Post not found' }]);

      return res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json([{ message: 'Server error' }]);
    }
  }

  async update(req, res) {
    try {
      let post = await Post.findByPk(req.params.id);

      if (!post) return res.status(404).json([{ message: 'Post not found' }]);

      const { tags, ...data } = req.body;

      await post.update(data);

      if (tags && tags.length > 0) {
        await post.setTags(tags);
      }

      post = await Post.findByPk(post.id, {
        include: [{ association: 'user' }, { association: 'category' },
        { association: 'tags' }]
      });

      return res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json([{ message: 'Server error' }]);
    }
  }

  async destroy(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) return res.status(404).json([{ message: 'Post not found' }]);

      if (post.main_image && process.env.STORAGE_TYPE === 'S3') {
        const s3 = new AWS.S3();
        const file = post.main_image.split('com/');
        const path = file[1];
        const params = {
          Bucket: process.env.STORAGE_BUCKET,
          Key: path
        };

        let images = await Image.findAll({ where: { post_id: post.id } });
        let imagesParams = {
          Bucket: process.env.STORAGE_BUCKET,
          Delete: {
            Objects: []
          }
        };

        if (images.length > 0) {
          images = images.map(image => { return { Key: image.key } });
          imagesParams.Delete.Objects = images;
        }

        try {
          //await s3.headObject(params).promise();

          try {
            await s3.deleteObject(params).promise();

            if (images.length > 0) {
              await s3.deleteObjects(imagesParams).promise();
            }
          }
          catch (error) {
            return res.status(500).json([{ message: error }]);
          }
        } catch (error) {
          return res.status(500).json([{ message: error }]);
        }
      }

      await post.destroy();

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json([{ message: 'Server error' }]);
    }
  }
}

export default PostController;
