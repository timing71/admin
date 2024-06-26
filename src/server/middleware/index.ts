import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorMiddleware from './error.middleware.js';
import config from '../../config/index.js';
import routes from '../../admin/index.js';

export default ({ app }: { app: Application }): void => {
    app.use(cors());

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(config.admin.url, routes());

    app.use(helmet());

    app.use(errorMiddleware);
}
