var express = require('express')
var router = express.Router();
var passport = require('passport');
var controllers = require('require.all')('../controllers')
var passportConfig = require('./passport');

/**
 * Primary router routes.
 */

// signing in locally

router.get('/', controllers.home.index);
router.get('/login', controllers.user.getLogin);
router.post('/login', controllers.user.postLogin);
router.get('/logout', controllers.user.logout);
router.get('/forgot', controllers.user.getForgot);
router.post('/forgot', controllers.user.postForgot);
router.get('/reset/:token', controllers.user.getReset);
router.post('/reset/:token', controllers.user.postReset);
router.get('/signup', controllers.user.getSignup);
router.post('/signup', controllers.user.postSignup);
router.get('/contact', controllers.contact.getContact);
router.post('/contact', controllers.contact.postContact);
router.get('/account', passportConfig.isAuthenticated, controllers.user.getAccount);
router.post('/account/profile', passportConfig.isAuthenticated, controllers.user.postUpdateProfile);
router.post('/account/password', passportConfig.isAuthenticated, controllers.user.postUpdatePassword);
router.post('/account/delete', passportConfig.isAuthenticated, controllers.user.postDeleteAccount);
router.get('/account/unlink/:provider', passportConfig.isAuthenticated, controllers.user.getOauthUnlink);

/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/auth/instagram', passport.authenticate('instagram'));
router.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});

/**
 * OAuth authorization routes. (API examples)
 */
router.get('/auth/foursquare', passport.authorize('foursquare'));
router.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/foursquare');
});
router.get('/auth/tumblr', passport.authorize('tumblr'));
router.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/tumblr');
});
router.get('/auth/venmo', passport.authorize('venmo', { scope: 'make_payments access_profile access_balance access_email access_phone' }));
router.get('/auth/venmo/callback', passport.authorize('venmo', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/venmo');
});
router.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
router.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
router.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/api/pinterest');
});

module.exports = router;
