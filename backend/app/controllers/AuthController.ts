import User from '../models/User';
import { Request, Response } from 'express';

interface IUserAuth {
    email?: string;
    password?: string;
}

class AuthController {
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const data: IUserAuth = req.body;

            return res.status(201).json(data);
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default AuthController;
