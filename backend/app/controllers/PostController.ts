import Post from '../models/Post';
import { Request, Response } from 'express';

interface IPost extends Post {
    id?: number;
    user_id?: number;
    category_id?: number;
    tags?: number[];
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

        const data = {
            total: posts.rows.length,
            perPage: limit,
            lastPage: Math.ceil(posts.rows.length / limit),
            page,
            data: posts.rows
        };

        return res.json(data);
    }

    public async store(req: IReq, res: Response): Promise<Response> {
        try {
            const { tags, ...data }: IPost = req.body;

            const { location } = req.file;
            data.main_image = location;

            let post: IPost = await Post.create(data);

            if (tags && tags.length > 0) {
                await post.setTags(tags);
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

            await post.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default PostController;
