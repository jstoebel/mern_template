import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();
import passport from 'passport';
const controllers = require('require.all')('../controllers');
require('./passport');  // need to run passport config

// Middleware to require login/auth
// eslint-disable-next-line 
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

/**
 * Primary router routes.
 */

// signing in locally

router.get('/', controllers.home.index);

router.post('/register', controllers.authentication.register);
router.post('/login', requireLogin, controllers.authentication.login);

export default router;
