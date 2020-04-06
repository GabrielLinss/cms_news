import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import morgan from 'morgan';

class App {
    public express: express.Application;

    public constructor() {
      this.express = express();

      this.middlewares();
      this.routes();
    }

    private middlewares(): void {
      this.express.use(express.json());
      this.express.use(cors());
      this.express.use(errors());
      this.express.use(morgan('dev'));
    }

    private routes(): void {
      this.express.use(routes);
    }
}

export default App;
