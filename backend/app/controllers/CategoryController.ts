import Category from '../models/Category';
import { Request, Response } from 'express';

interface ICategory {
    name?: string;
}

class CategoryController {
    public async index(req: Request, res: Response): Promise<Response> {
        const categories: Category[] = await Category.findAll();

        return res.json(categories);
    }

    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const data: ICategory = req.body;

            const category = await Category.create(data);

            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const category = await Category.findByPk(req.params.id);

            if (!category) return res.status(404).json([{ message: 'Category not found' }]);

            const data: ICategory = req.body;

            await category.update(data);

            return res.json(category);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        try {
            const category = await Category.findByPk(req.params.id);

            if (!category) return res.status(404).json([{ message: 'Category not found' }]);

            await category.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default CategoryController;
