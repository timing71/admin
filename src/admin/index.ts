import { Router } from 'express';

import { auth } from './auth/index.js';
import { users } from './users/index.js';

export default (): Router => {
    const app = Router();

    app.use('/auth', auth);
    app.use('/users', users);

    return app;
};
