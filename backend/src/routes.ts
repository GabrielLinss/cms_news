import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import CategoryController from './app/controllers/CategoryController';
import TagController from './app/controllers/TagController';
import ImageController from './app/controllers/ImageController';
import AuthController from './app/controllers/AuthController';
import Auth from './app/middlewares/Auth';

const routes = Router();

const userController = new UserController;
const postController = new PostController;
const categoryController = new CategoryController;
const tagController = new TagController;
const imageController = new ImageController;
const authController = new AuthController;

const auth = new Auth;

// Base route
routes.get('/', (req, res) => {
    return res.json({ message: 'API is online' });
});

// User routes
routes.get('/users', auth.interceptRequest, userController.index);
routes.get('/users/:id', userController.show);
routes.delete('/users/:id', auth.interceptRequest, userController.destroy);

routes.put('/users/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string(),
        email: Joi.string().email()
    })
}), auth.interceptRequest, userController.update);

// Auth routes
routes.post('/login', authController.login);
routes.post('/logout', authController.logout);

routes.post('/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role_id: Joi.number().required(),
        password_confirmation: Joi.string().valid(Joi.ref('password')).required()
    })
}), authController.register);

// Post routes
routes.get('/posts', postController.index);
routes.get('/postsByMonth', postController.indexByDate);
routes.get('/posts/:id', postController.show);
routes.delete('/posts/:id', auth.interceptRequest, postController.destroy);

routes.post('/posts', auth.interceptRequest,
                      multer(multerConfig).single('main_image'),
                      postController.store);

routes.put('/posts/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        category_id: Joi.number(),
        tags: [ Joi.number() ],
        title: Joi.string(),
        subtitle: Joi.string(),
        content: Joi.string()
    })
}), auth.interceptRequest, postController.update);

// Category routes
routes.get('/categories', categoryController.index);
routes.delete('/categories/:id', auth.interceptRequest, categoryController.destroy);

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

// Tag routes
routes.get('/tags', tagController.index);
routes.delete('/tags/:id', auth.interceptRequest, tagController.destroy);

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

// Image routes
routes.post('/images', auth.interceptRequest,
                       multer(multerConfig).array('images', 5),
                       imageController.store);

routes.delete('/images/:id', auth.interceptRequest, imageController.destroy);

export default routes;
