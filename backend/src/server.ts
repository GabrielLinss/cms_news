import app from './app';
require('dotenv').config();

const port = process.env.API_PORT;

app.listen(port, () => console.log('Running on port:', port));
