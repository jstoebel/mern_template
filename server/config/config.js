// eslint-disable-next-line max-len
// borrowed from here: http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application/7350875#7350875

// eslint-disable-next-line no-undef

if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  let dotenv = require('dotenv');
  dotenv.load();
  exports.currentEnv = process.env.NODE_ENV;
} else {
  exports.currentEnv = 'production';
}

exports.appName = 'mern_template';

let dbName = exports.appName.toLowerCase()+'_'+exports.currentEnv;
// either Heroku's URL or create my own
exports.db = {URL: process.env.MONGODB_URI ||
    'mongodb://localhost:27017/' + dbName,
  name: dbName,
};

exports.secret = process.env.SESSION_SECRET;
