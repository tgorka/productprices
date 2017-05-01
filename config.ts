export default {
    environment: process.env.NODE_ENV || "dev",
    server: {
        port: process.env.PORT || 9081
    },
    jwt: {
        secret: process.env.JWT_SECRET || "jwt_secret"
    },
    mongo: {
        url: process.env.MONGO_DB_URI || process.env.MONGODB_URI || 'mongodb://localhost/vls'
    },
    uri: {
    }
};
