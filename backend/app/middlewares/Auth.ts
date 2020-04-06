import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';

config();

interface Decoded {
    id: number;
}

interface IReq extends Request {
    userId: number;
}

class Auth {
    public interceptRequest(req: IReq, res: Response, next: NextFunction): Response {
        try{
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).send({error: 'No token provided'});
            }

            const parts = authHeader.split(' ');

            if (parts.length !== 2) {
                return res.status(401).send({error: 'Token error'});
            }

            const [scheme, token] = parts;

            if(!/^Bearer$/i.test(scheme)){
                return res.status(401).send({error: 'Token malformated'});
            }

            jwt.verify(token, process.env.API_KEY, (err, decoded: Decoded) => {
                if(err) return res.status(401).send({error: 'Token invalid'});

                req.userId = decoded.id;
                return next();
            });
        } catch (err){
            return res.status(500).send({ error: err });
        }
    }
}

export default Auth;
