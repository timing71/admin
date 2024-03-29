import startServer from './server/index.js';

startServer()
    .then(() => console.log('Server start success!'))
    .catch(error => console.log('Server start error: ', error.message));
