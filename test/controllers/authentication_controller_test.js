/* global describe it */
import request from 'supertest';
import {expect} from 'chai';
import factory from '../factories';
import app from '../../server/index';
import User from '../../server/models/User'

let testPw = '123'
describe('LOGIN', () => {
  it('should return 200 ok', (done) => {
    factory.create('user', {password: testPw})
      .then((user) => {
        request(app)
          .post('/api/auth/login')
          .send({email: user.email, password: testPw})
          .expect(200, done);
      });
  
  });
  
  it('should return token and userInfo', (done) => {
    factory.create('user', {password: testPw})
      .then((user) => {
        request(app)
          .post('/api/auth/login')
          .send({email: user.email, password: testPw})
          .then((resp) => {
            expect(resp.body.token).to.not.equal(undefined)
            expect(resp.body.user._id).to.equal(user._id.toString());
            expect(resp.body.user.firstName).to.equal(user.profile.firstName)
            expect(resp.body.user.lastName).to.equal(user.profile.lastName)
            expect(resp.body.user.email).to.equal(user.email);
            expect(resp.body.user.role).to.equal(user.role);
            done();
          })
      })
  });
});

describe('REGISTER', () => {
  it('should return user info and token on successful reg', (done) => {
    factory.create('user', {password: testPw})
      .then((user) => {
        console.log("from the factory");
        console.log(user);
        request(app)
          .post('/api/auth/register')
          .send({
            email: user.email,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            password: testPw
          })
          .then((resp) => {
            console.log(resp.body);
            expect(resp.body.token).to.not.equal(undefined)
            expect(resp.body.user._id).to.equal(user._id.toString());
            expect(resp.body.user.firstName).to.equal(user.profile.firstName)
            expect(resp.body.user.lastName).to.equal(user.profile.lastName)
            expect(resp.body.user.email).to.equal(user.email);
            expect(resp.body.user.role).to.equal(user.role);
            done();
          })
      })
  })
  
  
});
