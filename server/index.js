/**
 * Module dependencies.
 */
 
var express = require('express');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var config = require('./config/config')

var MongoStore = require('connect-mongo/es5')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var passport = require('passport');
var expressValidator = require('express-validator');
var sass = require('node-sass-middleware');
var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads') });
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

var httpProxy = require('http-proxy');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */


/**
 * API keys and Passport configuration.
 */
var passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

// end

/**
 * Connect to MongoDB.
 */
console.log("trying to connect to " +config.db.URL)
mongoose.connect(config.db.URL);

mongoose.connection.on('connected', function () {
  console.log("connected to " + config.db.URL)
});

mongoose.connection.on('error', function() {
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
  sourceMap: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: config.db.URL,
    autoReconnect: true
  })
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
app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }));
app.use('/', require('./config/routes'))


/**
 * Error Handler.
 */
app.use(errorHandler());


// output routes to file
if (process.env.NODE_ENV === 'development') {

    // Absolute path to output file
    var path = require('path')
    var filepath = path.join(__dirname, '../docs/routes.generated.txt')
    // Invoke express-print-routes
    require('express-print-routes')(app, filepath)
    
}

/**
 * Start Express server.
 */
const port = process.env.PORT || 8000
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, config.currentEnv);
});




module.exports = app;
