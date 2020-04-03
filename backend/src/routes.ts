import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import UserController from '../app/controllers/UserController';

const routes = Router();

const userController = new UserController;

routes.get('/', (req, res) => {
    return res.json({ message: 'Serra notícias API is online' });
});

routes.get('/users', userController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().valid(Joi.ref('password')).required()
    })
}), userController.store);

routes.get('/users/:id', userController.show);

routes.put('/users/:id', userController.update);

routes.delete('/users/:id', userController.destroy);

export default routes;
