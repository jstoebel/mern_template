/* global describe it */
console.log("STARTING AUTH CONTROLLER TEST");
import request from 'supertest';
import {expect} from 'chai';

import app from '../../server/index';
import {factory} from '../factories';


describe('POST /api/auth/login', () => {
  it('should return 200 ok', (done) => {
    factory.build('user')
      .then((user) => {
        request(app)
          .post('/api/auth/login')
          .send({user: user})
          .expect(200, done);
      });
  });
  
  it('returns token and userInfo', () => {
    factory.build('user')
      .then((user) => {
        request(app)
          .post('/api/auth/login')
          .send({user: user})
          .then((resp) => {
            expect(resp.body._id).to.equal(user._id);
            expect(resp.body.firstName).to.equal(user.firstName);
            expect(resp.body.lastName).to.equal(user.lastName);
            expect(resp.body.email).to.equal(user.email);
            expect(resp.body.role0.to.equal(user.role));
            done();
          });
      });
  });
});
