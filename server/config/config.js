// eslint-disable-next-line max-len
// borrowed from here: http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application/7350875#7350875

// eslint-disable-next-line no-undef

import dotenv from 'dotenv';
dotenv.load();
let currentEnv;

if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  currentEnv = process.env.NODE_ENV;
} else {
  currentEnv = 'production';
}

const appName = 'mern_template';

let dbName = `${appName.toLowerCase()}_${currentEnv}`;

// either Heroku's URL or create my own
const db = {URL: process.env.MONGODB_URI ||
    `mongodb://localhost:27017/${dbName}`,
  name: dbName,
};

const secret = process.env.SESSION_SECRET;

export {currentEnv, appName, db, secret};
