import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import morgan from 'morgan';

class App {
    express: express.Application;

    constructor() {
      this.express = express();

      this.middlewares();
      this.routes();
    }

    middlewares() {
      this.express.use(express.json());
      this.express.use(express.urlencoded({ extended: true }));
      this.express.use(cors());
      this.express.use(errors());
      this.express.use(morgan('dev'));
    }

    routes() {
      this.express.use(routes);
    }
}

export default App;
