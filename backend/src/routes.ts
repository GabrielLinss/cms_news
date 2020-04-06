import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import UserController from '../app/controllers/UserController';
import PostController from '../app/controllers/PostController';
import CategoryController from '../app/controllers/CategoryController';
import TagController from '../app/controllers/TagController';
import Auth from '../app/middlewares/Auth';

const routes = Router();

const userController = new UserController;
const postController = new PostController;
const categoryController = new CategoryController;
const tagController = new TagController;

const auth = new Auth;

// Base route
routes.get('/', (req, res) => {
    return res.json({ message: 'Serra notícias API is online' });
});

// User routes
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

routes.post('/login', userController.login);

// Post routes
routes.get('/posts', postController.index);
routes.post('/posts', postController.store);
routes.get('/posts/:id', postController.show);
routes.put('/posts/:id', postController.update);
routes.delete('/posts/:id', postController.destroy);

// Category routes
routes.get('/categories', categoryController.index);
routes.post('/categories', categoryController.store);
routes.put('/categories/:id', categoryController.update);
routes.delete('/categories/:id', categoryController.destroy);

// Tag routes
routes.get('/tags', tagController.index);
routes.post('/tags', tagController.store);
routes.put('/tags/:id', tagController.update);
routes.delete('/tags/:id', tagController.destroy);

export default routes;
