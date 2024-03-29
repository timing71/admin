import express from 'express';
import config from '../config/index.js';
import { setupServer } from './utils/index.js';
import setupServerMiddleware from './middleware/index.js';

const { server } = config;

export default async () => {
    const app = express();

    setupServerMiddleware({ app });

    app.listen(server.port, setupServer);
};
