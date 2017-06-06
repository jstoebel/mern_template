/* global describe it */
let chai = require('chai');
// eslint-disable-next-line no-unused-vars
let should = chai.should();
// eslint-disable-next-line no-unused-vars
let models = require('require.all')('../models');
let factory = require('../factories');

require('../test_config');

describe('User Model', () => {
  it('requires a unique email', function(done) {
    factory.createMany('user', 2, {email: 'same@email.com'}).then(function(users) {
      done(new Error('fail'));
    }).catch(function(err) {
      err.code.should.equal(11000);
      done();
    });
  });
});
