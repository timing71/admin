export default {
    build: process.env.NODE_ENV,
    server: {
        port: parseInt(process.env.PORT as string) || 8080,
        host: process.env.HOST || 'localhost',
    },
    jwt: {
        secret: process.env.JWT_SHARED_SECRET!,
    },
    admin: {
        url: '/admin/',
    },
};
