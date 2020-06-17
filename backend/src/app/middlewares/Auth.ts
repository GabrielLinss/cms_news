import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
      userId: number;
  }
}

class Auth {
    interceptRequest(req: Request, res: Response, next: NextFunction) {
        try{
            const authHeader = req.headers.authorization;

            if(!authHeader){
                return res.status(401).json([{ error: 'No token provided' }]);
            }

            const parts = authHeader.split(' ');

            if(parts.length !== 2){
                return res.status(401).json([{ error: 'Token error' }]);
            }

            const [scheme, token] = parts;

            if(!/^Bearer$/i.test(scheme)){
                return res.status(401).json([{ error: 'Token malformated' }]);
            }

            if (!token) {
              return res.status(401).json([{ error: 'Token malformated' }]);
            }

            let decoded: any;

            try {
              decoded = jwt.verify(token, String(process.env.API_KEY));
            } catch(err) {
              return res.status(401).json([{ error: 'Token invalid' }]);
            }

            req.userId = decoded.id;

            return next();
        } catch (err){
            return res.status(500).json([{ error: 'Server error' }]);
        }
    }
}

export default Auth;
