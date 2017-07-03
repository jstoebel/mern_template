/* global describe it */
import request from 'supertest';
import {expect} from 'chai';
import factory from '../factories';
import User from '../../server/models/User';

let testPw = '123'

describe('User Model', () => {

  let testUser;
  beforeEach((done) => {
    // build a user but don't persist
    factory.build('user', {password: testPw})
      .then((user) => {
        testUser = user;
        done();
      })
  }) // beforeEach

  afterEach((done) => {
    User.remove({}, () => {
      done();
    })
  }); // afterEach

  it('requires a unique email', (done) => {

    testUser.save((err) => {
      factory.create('user', {email: testUser.email})
        .then((user) => {
          done(new Error('test failed.'));
        }).catch((err) => {
          expect(err.code).to.equal(11000);
          done();
        })
    })
  });

});
