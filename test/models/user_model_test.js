var chai = require('chai');
var should = chai.should();
var models = require('require.all')('../models')
var factory = require('../factories')

require('../test_config')

describe('User Model', () => {

  it('requires a unique email', function(done) {
    factory.createMany('user', 2, {email: "same@email.com"}).then(function(users){
      done(new Error("fail"))
    }).catch(function(err){
      err.code.should.equal(11000);
      done();
    })
  });

});
