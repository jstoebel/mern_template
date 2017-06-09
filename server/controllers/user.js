import mongoose from 'mongoose';
import passport from 'passport';
import User from '../models/user';

// -------------------------------------------

exports.login = function(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.json({success: false, message: info.message});
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    // Passport exposes a login() function on req (also aliased as logIn())
    // that can be used to establish a login session
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.json({success: false, message: loginErr});
      }
      return res.json({success: true, message: 'authentication succeeded'});
    });
  })(req, res, next);
};

// -------------------------------------------

exports.logout = function(req, res, next) {
  // the logout method is added to the request object automatically by Passport
  req.logout();
  return res.json({success: true});
};

// -------------------------------------------

exports.register = function(req, res, next) {
  User.findOne({email: req.body.email}, (err, user) => {
    // is email address already in use?
    if (user) {
      res.json({success: false, message: 'Email already in use'});
      return;
    } else {
      // go ahead and create the new user
      User.create(req.body, (err) => {
        if (err) {
          res.json({success: false});
          return;
        }
        res.json({success: true});
        return;
      });
    }
  });
};
