/**
 * Module dependencies.
 */

let express = require('express');
let compress = require('compression');
let session = require('express-session');
let bodyParser = require('body-parser');
let logger = require('morgan');
let errorHandler = require('errorhandler');
let lusca = require('lusca');
let config = require('./config/config');

let MongoStore = require('connect-mongo/es5')(session);
let flash = require('express-flash');
let path = require('path');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let passport = require('passport');
let expressValidator = require('express-validator');
let sass = require('node-sass-middleware');
let multer = require('multer');
// eslint-disable-next-line no-unused-vars
let upload = multer({dest: path.join(__dirname, 'uploads')});
let httpProxy = require('http-proxy');
// eslint-disable-next-line no-unused-vars
let proxy = httpProxy.createProxyServer();

// eslint-disable-next-line no-unused-vars
let passportConfig = require('./config/passport');
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

// end

/**
 * Connect to MongoDB.
 */

// eslint-disable-next-line no-console
console.log('trying to connect to ' +config.db.URL);
mongoose.connect(config.db.URL);

mongoose.connection.on('connected', function() {
  // eslint-disable-next-line no-console
  console.log('connected to ' + config.db.URL);
});

mongoose.connection.on('error', function() {
  // eslint-disable-next-line no-console
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true,
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: config.db.URL,
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
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  // After successful login, redirect back to /api, /contact or /
  if (/(api)|(contact)|(^\/$)/i.test(req.path)) {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, '..', 'public'), {maxAge: 31557600000}));
app.use('/', require('./config/routes'));


/**
 * Error Handler.
 */
app.use(errorHandler());


// output routes to file
if (process.env.NODE_ENV === 'development') {
    // Absolute path to output file
    const path = require('path');
    let filepath = path.join(__dirname, '../docs/routes.generated.txt');
    // Invoke express-print-routes
    require('express-print-routes')(app, filepath);
}

/**
 * Start Express server.
 */
const port = process.env.PORT || 8000;
app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port %d in %s mode', port, config.currentEnv);
});


module.exports = app;
