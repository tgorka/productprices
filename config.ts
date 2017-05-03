import * as winston from "winston";

winston.level = process.env.LOG_LEVEL || "info";

export default {
  environment: process.env.NODE_ENV || "dev",
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 9081
  },
  jwt: {
    secret: process.env.JWT_SECRET || process.env.AUTH0_CLIENT_SECRET || "jwt_secret"
  },
  mongo: {
    url: process.env.MONGO_DB_URI || process.env.MONGODB_URI || 'mongodb://localhost/vls'
  },
  uri: {}
};
