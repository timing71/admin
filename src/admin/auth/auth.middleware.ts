import { Request, Response, NextFunction } from 'express';
import { jwtManager } from '../../features/index.js';
import authHttpContext from './auth.http.context.js';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const [_, token] = (req.headers.authorization ?? '').split(' ');

    const context = jwtManager.validate(token);

    authHttpContext.bind(req, context);

    next();
};

export default authMiddleware;
