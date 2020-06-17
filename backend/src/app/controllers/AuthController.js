const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (params = {}) => {
    return jwt.sign(params, process.env.API_KEY, {
        expiresIn: 86400
    });
}

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email },
                include: [ { association: 'role' } ] });

            if (!user) return res.status(404).json([{ message: 'User with email not found' }]);

            if(!bcrypt.compareSync(password, user.password)){
                return res.status(400).json([{ message: 'Invalid password' }]);
            }

            user.password = '';

            return res.json({ user, token: generateToken({ id: user.id })});
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async register(req, res) {
        try{
            const { email } = req.body;

            const exists = await User.findOne({ where: { email } });

            if (exists) return res.status(400).json([{ message: 'User already exists' }]);

            delete req.body.password_confirmation;

            let salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);

            let user = await User.create(req.body);

            user = await User.findByPk(user.id, {
                include: [ { association: 'role' } ]
            });

            user.password = undefined;

            return res.status(201).json({ user, token: generateToken({ id: user.id })});
        } catch (error){
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async logout(req, res) {
        try {
            const token = req.headers.authorization;

            const data = { token };

            const revoked = await Token.create(data);

            return res.json([{ message: 'Logout success' }]);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }
}

module.exports = AuthController;
