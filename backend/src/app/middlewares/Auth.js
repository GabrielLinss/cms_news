import jwt from 'jsonwebtoken';
import Token from '../models/Token';

class Auth {
    async interceptRequest(req, res, next) {
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

            const revokedToken = await Token.findOne({ where: { token } });

            if (revokedToken && revokedToken.is_revoked) {
                return res.status(401).json([{ message: 'Token revoked' }]);
            }

            if(!/^Bearer$/i.test(scheme)){
                return res.status(401).send({error: 'Token malformated'});
            }

            jwt.verify(token, process.env.API_KEY, (err, decoded) => {
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
