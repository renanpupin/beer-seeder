// require and configure dotenv, will load vars in .env in PROCESS.ENV
const env = require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,	//get from system ENV variables
  port: process.env.PORT,	//get from system ENV variables
  db: process.env.MONGODB_URL,	//get from .env
  jwtSecret: process.env.JWT_SECRET,	//get from .env
};

module.exports = config;