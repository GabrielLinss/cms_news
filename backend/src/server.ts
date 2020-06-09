import { config } from 'dotenv';

config();

import App from './app';
import './database';

const app = new App().express;

const port = process.env.API_PORT;

app.listen(port, () => console.log('Running on port:', port));
