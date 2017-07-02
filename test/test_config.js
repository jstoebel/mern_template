//  Modified from https://github.com/elliotf/mocha-mongoose
/* global beforeEach afterEach */
// eslint-disable-next-line no-unused-vars
let config = require('../server/config/config');
let mongoose = require('mongoose');
let _ = require('underscore');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

const clearDB = function(done) {
  _.each(mongoose.connection.models, function(model, name) {
    model.remove({}, function(err) {
      if (err) {
        throw err
      }
      model.find({}, function(items) {
        done()
      })
    });
  });
};

beforeEach(function(done) {
  console.log("before hook");
  clearDB(done);
  console.log("before hook done");
});

afterEach(function() {
  // console.log("after hook");
  // clearDB();
});
