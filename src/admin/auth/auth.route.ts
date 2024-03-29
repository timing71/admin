import { Router } from 'express';
import controller from './auth.controller.js';
import authMiddleware from './auth.middleware.js';

export const router = Router();

router.post('/login', controller.login);
router.get('/get-identity', authMiddleware, controller.getIdentity);
router.get('/check-auth', authMiddleware, controller.checkAuth);
router.post('/logout', controller.logout);

export default router;
