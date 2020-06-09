import User from '../models/User';
import { Request, Response } from 'express';

class UserController {
    async index(req: Request, res: Response) {
        try {
          const users = await User.findAll({
              include: [ { association: 'role' } ]
          });

          return res.json(users);
        } catch(error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params.id, { include: [ { association: 'role' } ]});

            if (!user) return res.status(404).json([{ message: 'User not found' }]);

            return res.json(user);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params.id, { include: [ { association: 'role' } ]});

            if (!user) return res.status(404).json([{ message: 'User not found' }]);

            const data = req.body;

            await user.update(data);

            return res.json(user);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) return res.status(404).json([{ message: 'User not found' }]);

            await user.destroy();

            return res.status(204).send();
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }
}

export default UserController;
