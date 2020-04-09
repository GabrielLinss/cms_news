import User from '../models/User';
import { Request, Response } from 'express';

interface IUser {
    username?: string;
    email?: string;
    password?: string;
    role_id?: number;
}

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users: User[] = await User.findAll({
            include: [ { association: 'role' } ]
        });

        return res.json(users);
    }

    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const data: IUser = req.body;

            const user = await User.create(data, { include: [ { association: 'role' } ]});

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async show(req: Request, res: Response): Promise<Response> {
        try {
            const user = await User.findByPk(req.params.id, { include: [ { association: 'role' } ]});

            if (!user) return res.status(404).json([{ message: 'User not found' }]);

            return res.json(user);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const user = await User.findByPk(req.params.id, { include: [ { association: 'role' } ]});

            if (!user) return res.status(404).json([{ message: 'User not found' }]);

            const data: IUser = req.body;

            await user.update(data);

            return res.json(user);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) return res.status(404).json([{ message: 'User not found' }]);

            await user.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default UserController;
