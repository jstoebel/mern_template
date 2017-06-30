'use strict';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user';
import {secret as appSecret} from '../config/config';

function generateToken(user) {
  return jwt.sign(user, appSecret, {
    expiresIn: 10080, // in seconds
  });
}

// Set user info from request
// selects the user information we want to pass through
function setUserInfo(request) {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role,
  };
}

// ========================================
// Login Route
// ========================================
exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo,
  });
};


// ========================================
// Registration Route
// ========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({error: 'You must enter a password.'});
  }

  User.findOne({email: email}, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({error: 'That email address is already in use.'});
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        profile: {firstName: firstName, lastName: lastName},
      });

      user.save(function(err, user) {
        if (err) {
          return next(err);
        }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo,
        });
      });
  });
};

exports.checkToken = function(req, res) {
  console.log("checkToken passes!");
  res.status(200).json({status: 'success'})
}

// ========================================
// Authorization Middleware
// ========================================

// Role authorization check
exports.roleAuthorization = function(role) {
  console.log("responding with roleAuthorization");
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({error: 'No user was found.'});
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({error: 'You are not authorized to view this content.'});
      return next('Unauthorized');
    });
  };
};
