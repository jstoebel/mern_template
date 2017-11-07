// export an object of the safe listed env variables

let dotenv = require('dotenv');
const _ = require('lodash');

dotenv.load();
let allowedEnvVars = ['AUTH_DOMAIN', 'AUTH_CLIENT_ID', 'redirectUri'];
module.exports = JSON.stringify(_.pick(process.env, allowedEnvVars));
