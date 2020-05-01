import Post from '../models/Post';
import Image from '../models/Image';
import Tag from '../models/Tag';
import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import { config } from 'dotenv';
import { Op } from 'sequelize';

config();

interface IPost extends Post {
    id?: number;
    user_id?: number;
    category_id?: number;
    tags?: string;
    main_image?: string;
    title?: string;
    subtitle?: string;
    content?: string;
}

interface IReq extends Request {
    file: {
        location: string;
    }
}

interface IImage extends Image {
    key?: string;
}

interface ITag extends Tag {
  id?: number;
  name?: string;
}

class PostController {
    public async index(req: Request, res: Response): Promise<Response> {
        let { page = 1, limit = 5 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const offset = (page - 1) * limit;

        const posts = await Post.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            include: [ { association: 'user' },
                       { association: 'category' },
                       { association: 'tags' } ]
        });

        const total = await Post.count();

        const data = {
            total,
            perPage: limit,
            lastPage: Math.ceil(total / limit),
            page,
            data: posts.rows
        };

        return res.json(data);
    }

    public async store(req: IReq, res: Response): Promise<Response> {
        try {
            let { tags, ...data }: IPost = req.body;

            let separatedAndCreatedTags = [];

            if (tags && tags.length > 0) {
              let arrayTags = tags.split(',');

              for (let tag of arrayTags) {
                let t: ITag = await Tag.findOne({ where: { name: { [Op.like]: '%' + tag } } });

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

            let post: IPost = await Post.create(data);

            if (separatedAndCreatedTags && separatedAndCreatedTags.length > 0) {
                await post.setTags(separatedAndCreatedTags);
            }

            post = await Post.findByPk(post.id, {
                include: [ { association: 'user' },
                           { association: 'category' },
                           { association: 'tags' } ]
            });

            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async show(req: Request, res: Response): Promise<Response> {
        try {
            const post = await Post.findByPk(req.params.id, {
                include: [ { association: 'user' }, { association: 'category' },
                           { association: 'tags' }, { association: 'images' } ]
            });

            if (!post) return res.status(404).json([{ message: 'Post not found' }]);

            return res.json(post);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            let post: IPost = await Post.findByPk(req.params.id);

            if (!post) return res.status(404).json([{ message: 'Post not found' }]);

            const { tags, ...data }: IPost = req.body;

            await post.update(data);

            if (tags && tags.length > 0) {
                await post.setTags(tags);
            }

            post = await Post.findByPk(post.id, {
                include: [ { association: 'user' }, { association: 'category' },
                           { association: 'tags' } ]
            });

            return res.json(post);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        try {
            const post: IPost = await Post.findByPk(req.params.id);

            if (!post) return res.status(404).json([{ message: 'Post not found' }]);

            if (post.main_image && process.env.STORAGE_TYPE === 'S3') {
                const s3 = new AWS.S3();
                const file = post.main_image.split('com/');
                const path = file[1];
                const params = {
                    Bucket: process.env.STORAGE_BUCKET,
                    Key: path
                };

                let images: any = await Image.findAll({ where: { post_id: post.id } });
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
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default PostController;
