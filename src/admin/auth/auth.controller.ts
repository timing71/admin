import type { Response, Request, NextFunction } from 'express';
import { z } from 'zod';

import authService from './auth.service.js';
import authHttpContext from './auth.http.context.js';

export default {
    async login(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string(),
        });

        const data = bodySchema.parse(req.body);

        const token = await authService.login(data);

        res.json({ token: token });
    },

    async logout(req: Request, res: Response) {
        res.json({ message: 'logout' });
    },

    async getIdentity(req: Request, res: Response) {
        const { userId } = authHttpContext.get(req);

        const data = await authService.getIdentity(userId);

        res.json({ user: data });
    },

    async checkAuth(req: Request, res: Response) {
        const { userId } = authHttpContext.get(req);

        await authService.checkAuth(userId);

        res.status(200).json({ auth: true });
    },
};
