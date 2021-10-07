require('dotenv').config();

module.exports = {
  TOKEN: process.env.API_TOKEN,
  MONGO: process.env.MONGO,
  NTBA_FIX_319: process.env.NTBA_FIX_319
};
