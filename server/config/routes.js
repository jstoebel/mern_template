import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();
const controllers = require('require.all')('../controllers');

/**
 * Primary router routes.
 */

// signing in locally

router.get('/', controllers.home.index);

router.post('/login', controllers.user.login);
router.get('/logout', controllers.user.logout);
router.post('/register', controllers.user.register);

export default router;
