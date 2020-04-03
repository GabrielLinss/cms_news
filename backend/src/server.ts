import App from './App';
import { config } from 'dotenv';

config();

const app = new App().express;

const port = process.env.API_PORT;

app.listen(port, () => console.log('Running on port:', port));
