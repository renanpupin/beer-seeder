// require and configure dotenv, will load vars in .env in PROCESS.ENV
const env = require('dotenv').config();

const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  mongoUrl: env.MONGODB_URL
};

export default config;