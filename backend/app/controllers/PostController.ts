import Post from '../models/Post';
import { Request, Response } from 'express';

interface IPost {
    user_id?: number;
    category_id?: number;
    tags?: number[];
    title?: string;
    subtitle?: string;
    content?: string;
}

class PostController {
    public async index(req: Request, res: Response): Promise<Response> {
        const posts: Post[] = await Post.findAll();

        return res.json(posts);
    }

    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const { tags, ...data }: IPost = req.body;

            const post = await Post.create(data);

            if (tags.length > 0) {
                //attach das tags para o post
            }

            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async show(req: Request, res: Response): Promise<Response> {
        try {
            const post = await Post.findByPk(req.params.id);

            if (!post) return res.status(404).json([{ message: 'Post not found' }]);

            return res.json(post);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const post = await Post.findByPk(req.params.id);

            if (!post) return res.status(404).json([{ message: 'Post not found' }]);

            const { tags, ...data }: IPost = req.body;

            await post.update(data);

            if (tags.length > 0) {
                //attach das novas tags do post
            }

            return res.json(post);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        try {
            const post = await Post.findByPk(req.params.id);

            if (!post) return res.status(404).json([{ message: 'Post not found' }]);

            await post.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default PostController;
