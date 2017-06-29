/**
 * Module dependencies.
 */
import express from 'express';

import compress from 'compression';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import lusca from 'lusca';
import {currentEnv, db} from './config/config';

let MongoStore = require('connect-mongo/es5')(session);
import flash from 'express-flash';
import path from 'path';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import passport from 'passport';
import expressValidator from 'express-validator';
import printRoutes from 'express-print-routes';
import sass from 'node-sass-middleware';
import multer from 'multer';
// eslint-disable-next-line no-unused-vars
let upload = multer({dest: path.join(__dirname, '..', 'uploads')});
import httpProxy from 'http-proxy';
// eslint-disable-next-line no-unused-vars
let proxy = httpProxy.createProxyServer();

// eslint-disable-next-line no-unused-vars
import passportConfig from './config/passport';

import routes from './config/routes';
/**
 * Load environment variables from .env file,
 * where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely,
  after renaming `.env.example` to `.env`)
 */


/**
 * API keys and Passport configuration.
 */

/**
 * Create Express server.
 */
let app = express();

/**
 * Connect to MongoDB.
 */

// eslint-disable-next-line no-console
console.log(`trying to connect to ${db.URL}`);
mongoose.connect(db.URL);

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log(`connected to ${db.URL}`);
});

mongoose.connection.on('error', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true,
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: db.URL,
    autoReconnect: true,
  }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(function(req, res, next) {
//   if (req.path === '/api/upload') {
//     next();
//   } else {
//     lusca.csrf()(req, res, next);
//   }
// });
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(({user}, {locals}, next) => {
  locals.user = user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to /api, /contact or /
  if (/(api)|(contact)|(^\/$)/i.test(req.path)) {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(express.static(path.join(__dirname, '..', 'public'), {maxAge: 31557600000}));
app.use('/', routes);

/**
 * Error Handler.
 */
app.use(errorHandler());

// output routes to file
if (process.env.NODE_ENV === 'development') {
    // Absolute path to output file
    let filepath = path.join(__dirname, '../docs/routes.generated.txt');
    // Invoke express-print-routes
    printRoutes(app, filepath);
}

/**
 * Start Express server.
 */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port %d in %s mode', port, currentEnv);
});


export default app;
