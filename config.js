const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
