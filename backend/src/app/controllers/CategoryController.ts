import Category from '../models/Category';
import { Request, Response } from 'express';

class CategoryController {
    async index(req: Request, res: Response) {
        try {
          const categories = await Category.findAll();

          return res.json(categories);
        } catch(error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const data = req.body;

            const category = await Category.create(data);

            return res.status(201).json(category);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);

            if (!category) return res.status(404).json([{ message: 'Category not found' }]);

            const data = req.body;

            await category.update(data);

            return res.json(category);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);

            if (!category) return res.status(404).json([{ message: 'Category not found' }]);

            await category.destroy();

            return res.status(204).send();
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }
}

export default CategoryController;
