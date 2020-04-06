import Tag from '../models/Tag';
import { Request, Response } from 'express';

interface ITag {
    name?: string;
}

class TagController {
    public async index(req: Request, res: Response): Promise<Response> {
        const tags: Tag[] = await Tag.findAll();

        return res.json(tags);
    }

    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const data: ITag = req.body;

            const tag = await Tag.create(data);

            return res.status(201).json(tag);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const tag = await Tag.findByPk(req.params.id);

            if (!tag) return res.status(404).json([{ message: 'Tag not found' }]);

            const data: ITag = req.body;

            await tag.update(data);

            return res.json(tag);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        try {
            const tag = await Tag.findByPk(req.params.id);

            if (!tag) return res.status(404).json([{ message: 'Tag not found' }]);

            await tag.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default TagController;
