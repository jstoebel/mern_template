import express from 'express';
import passport from 'passport';
const controllers = require('require.all')('../controllers');
require('./passport');  // need to run passport config

// Middleware to require login/auth
// eslint-disable-next-line 
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

// eslint-disable-next-line new-cap
const masterRouter = express.Router();
masterRouter.get('/', controllers.home.index);

// api routes
// eslint-disable-next-line new-cap
const apiRouter = express.Router();
apiRouter.post('/auth/register', controllers.authentication.register);
apiRouter.post('/auth/login', requireLogin, controllers.authentication.login);

masterRouter.use('/api', apiRouter);
export default masterRouter;
