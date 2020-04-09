import User from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUserAuth extends User {
    id?: number;
    email?: string;
    password?: string;
}

interface IUserRegister extends User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    role_id?: number;
}

function generateToken(params = {}) {
    return jwt.sign(params, process.env.API_KEY, {
        expiresIn: 86400
    });
}

class AuthController {
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            const user: IUserAuth = await User.findOne({ where: { email }, 
                include: [ { association: 'role' } ] });

            if (!user) return res.status(404).json([{ message: 'User with email not found' }]);

            if(!bcrypt.compareSync(password, user.password)){
                return res.status(400).json([{ message: 'Invalid password' }]);
            }
        
            user.password = undefined;
        
            return res.json({ user, token: generateToken({ id: user.id })});
        } catch (error) {
            return res.status(500).json([{ message: error }]);
        }
    }

    public async register(req: Request, res: Response): Promise<Response> {
        try{
            const { email } = req.body;

            const exists = await User.findOne({ where: { email } });

            if (exists) return res.status(400).json([{ message: 'User already exists' }]);
    
            let salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);

            let user: IUserRegister = await User.create(req.body);

            user = await User.findByPk(user.id, {
                include: [ { association: 'role' } ]
            });
    
            user.password = undefined;
    
            return res.status(201).json({ user, token: generateToken({ id: user.id })});
        } catch (error){
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default AuthController;
