import { Router } from 'express';

import { auth } from './auth';
import { users } from './users';

export default (): Router => {
    const app = Router();

    app.use('/auth', auth);
    app.use('/users', users);

    return app;
};
