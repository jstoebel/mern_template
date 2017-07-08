import {secret as appSecret} from './config';
import {ExtractJwt} from 'passport-jwt';
import {Strategy as JwtStrategy} from 'passport-jwt';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import User from '../models/User';

const localOptions = {
    usernameField: 'email',
    passwordField: 'password',
};
// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions,
  function(email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {error: 'Your login details could not be verified. Please try again.'});
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, {error: 'Your login details could not be verified. Please try again.'});
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: appSecret,
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
