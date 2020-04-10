import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import UserController from '../app/controllers/UserController';
import PostController from '../app/controllers/PostController';
import CategoryController from '../app/controllers/CategoryController';
import TagController from '../app/controllers/TagController';
import AuthController from '../app/controllers/AuthController';
import Auth from '../app/middlewares/Auth';

const routes = Router();

const userController = new UserController;
const postController = new PostController;
const categoryController = new CategoryController;
const tagController = new TagController;
const authController = new AuthController;

const auth = new Auth;

// Base route
routes.get('/', (req, res) => {
    return res.json({ message: 'Serra notícias API is online' });
});

// User routes
routes.get('/users', auth.interceptRequest, userController.index);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string(),
        email: Joi.string().email()
    })
}), auth.interceptRequest, userController.update);
routes.delete('/users/:id', auth.interceptRequest, userController.destroy);

// Auth routes
routes.post('/login', authController.login);
routes.post('/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role_id: Joi.number().required(),
        password_confirmation: Joi.string().valid(Joi.ref('password')).required()
    })
}), authController.register);
routes.post('/logout', authController.logout);

// Post routes
routes.get('/posts', postController.index);
routes.post('/posts', celebrate({
    [Segments.BODY]: Joi.object().keys({
        user_id: Joi.number().required(),
        category_id: Joi.number().required(),
        tags: [ Joi.number() ],
        title: Joi.string().required(),
        subtitle: Joi.string().required(),
        content: Joi.string().required()
    })
}), auth.interceptRequest, postController.store);
routes.get('/posts/:id', postController.show);
routes.put('/posts/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        category_id: Joi.number(),
        tags: [ Joi.number() ],
        title: Joi.string(),
        subtitle: Joi.string(),
        content: Joi.string()
    })
}), auth.interceptRequest, postController.update);
routes.delete('/posts/:id', auth.interceptRequest, postController.destroy);

// Category routes
routes.get('/categories', categoryController.index);
routes.post('/categories', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}), auth.interceptRequest, categoryController.store);
routes.put('/categories/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
    })
}), auth.interceptRequest, categoryController.update);
routes.delete('/categories/:id', auth.interceptRequest, categoryController.destroy);

// Tag routes
routes.get('/tags', tagController.index);
routes.post('/tags', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}), auth.interceptRequest, tagController.store);
routes.put('/tags/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
    })
}), auth.interceptRequest, tagController.update);
routes.delete('/tags/:id', auth.interceptRequest, tagController.destroy);

export default routes;
