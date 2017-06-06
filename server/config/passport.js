import _ from 'lodash';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import User from '../models/User';

passport.serializeUser(({id}, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({usernameField: 'email'},
  (email, password, done) => {
    User.findOne({email: email.toLowerCase()}, (err, user) => {
      if (!user) {
        return done(null, false, {msg: `Email ${email} not found.`});
      }
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {msg: 'Invalid email or password.'});
        }
      });
    });
}));

/*
End JWT Strategy
*/

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

// Sign in with Twitter.

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: '/auth/twitter/callback',
  passReqToCallback: true,
}, (
    req, accessToken, tokenSecret, {id, displayName, _json, username}, done
  ) => {
  if (req.user) {
    User.findOne({twitter: id}, (err, existingUser) => {
      if (existingUser) {
        req.flash(
          'errors',
          {
            msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
          }
        );
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          user.twitter = id;
          user.tokens.push({kind: 'twitter', accessToken, tokenSecret});
          user.profile.name = user.profile.name || displayName;
          user.profile.location = user.profile.location ||
                                    _json.location;
          user.profile.picture = user.profile.picture
                                  || _json.profile_image_url_https;
          user.save((err) => {
            req.flash('info', {msg: 'Twitter account has been linked.'});
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({twitter: id}, (err, existingUser) => {
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User();
      // Twitter will not provide an email address.  Period.
      // But a person’s twitter username is guaranteed to be unique
      // so we can "fake" a twitter email address as follows:
      user.email = `${username}@twitter.com`;
      user.twitter = id;
      user.tokens.push({kind: 'twitter', accessToken, tokenSecret});
      user.profile.name = displayName;
      user.profile.location = _json.location;
      user.profile.picture = _json.profile_image_url_https;
      user.save((err) => {
        done(err, user);
      });
    });
  }
}));


// Login Required middleware.
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Authorization Required middleware.
function isAuthorized({path, user}, res, next) {
  const provider = path.split('/').slice(-1)[0];

  if (_.find(user.tokens, {kind: provider})) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
}

export {isAuthenticated, isAuthorized};
