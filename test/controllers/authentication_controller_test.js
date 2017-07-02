/* global describe it */
import request from 'supertest';
import {expect} from 'chai';
import factory from '../factories';
import app from '../../server/index';
import User from '../../server/models/User'


describe('POST /api/auth/login', () => {
  it('should return 200 ok', (done) => {
    
    let testPw = '123'
    factory.create('user', {password: testPw})
      .then((user) => {
        request(app)
          .post('/api/auth/login')
          .send({email: user.email, password: testPw})
          .expect(200, done);
      });
  
  });
  
  it('should return token and userInfo', (done) => {
    let testPw = '123'
    factory.create('user', {password: testPw})
      .then((user) => {
        request(app)
          .post('/api/auth/login')
          .send({email: user.email, password: testPw})
          .then((resp) => {
            expect(resp.body.token).to.not.equal(undefined)
            expect(resp.body.user._id).to.equal(user._id.toString());
            expect(resp.body.user.email).to.equal(user.email);
            expect(resp.body.user.role).to.equal(user.role);
            done();
          })
      })
  });
});
