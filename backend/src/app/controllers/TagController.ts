import Tag from '../models/Tag';
import { Request, Response } from 'express';

class TagController {
    async index(req: Request, res: Response) {
        try {
          const tags = await Tag.findAll();

          return res.json(tags);
        } catch(error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async store(req: Request, res: Response) {
        try {
          const data = req.body;

          const tag = await Tag.create(data);

          return res.status(201).json(tag);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const tag = await Tag.findByPk(req.params.id);

            if (!tag) return res.status(404).json([{ message: 'Tag not found' }]);

            const data = req.body;

            await tag.update(data);

            return res.json(tag);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const tag = await Tag.findByPk(req.params.id);

            if (!tag) return res.status(404).json([{ message: 'Tag not found' }]);

            await tag.destroy();

            return res.status(204).send();
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }
}

export default TagController;
