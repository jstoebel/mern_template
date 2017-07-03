/* global describe it */
import request from 'supertest';
import jwt from 'jsonwebtoken';
import {expect} from 'chai';
import factory from '../factories';
import app from '../../server/index';
import User from '../../server/models/User';
import {secret as appSecret} from '../../server/config/config';
import _ from 'lodash'

let testPw = '123'

const generateToken = (user) => {
  return jwt.sign(user, appSecret, {
    expiresIn: 10080, // in seconds
  });
}

describe('Authentication Controller', function(){
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
  
  describe('LOGIN', () => {
    
    let savedUser
    beforeEach((done) => {
      testUser.save((err) => {
        if (err){
          throw err;
        }
        savedUser = testUser;
        done();
      })
    })

    it('should return token and user info', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({email: testUser.email, password: testPw})
        .expect(200)
        .then((resp) => {
          expect(resp.body.token).to.not.equal(undefined);
          expect(resp.body.user.firstName).to.equal(testUser.profile.firstName)
          expect(resp.body.user.lastName).to.equal(testUser.profile.lastName)
          expect(resp.body.user.email).to.equal(testUser.email);
          expect(resp.body.user.role).to.equal(testUser.role);
          done();
        })
    }); // test
  });

  describe('REGISTER', () => {
  
    it('should return token and user info on successful reg', (done) => {
      request(app)
        .post('/api/auth/register')
        .send({
          email: testUser.email,
          firstName: testUser.profile.firstName,
          lastName: testUser.profile.lastName,
          password: testPw
        })
        .expect(201)
        .then((resp) => {
          expect(resp.body.token).to.not.equal(undefined)
          expect(resp.body.user.firstName).to.equal(testUser.profile.firstName)
          expect(resp.body.user.lastName).to.equal(testUser.profile.lastName)
          expect(resp.body.user.email).to.equal(testUser.email);
          expect(resp.body.user.role).to.equal(testUser.role);
          done();
        })
    }) // test

    let userAttrs = {
      email: 'test@test.com',
      firstName: 'Jacob',
      lastName: 'Stoebel',
      password: '123'
    } // attrs to use in request
    
    const cases = [
      {field: 'email', attr: {email: ''}, message: 'You must enter an email address.'},
      {field: 'firstName', attr: {firstName: ''}, message: 'You must enter your full name.'},
      {field: 'lastName', attr: {lastName: ''}, message: 'You must enter your full name.'},
      {field: 'password', attr: {password: ''}, message: 'You must enter a password.'}
    ]
    
    cases.forEach((c, i) => {
      it(`should fail with missing ${c.field}`, (done) => {
          const paramsToUse = _.merge({}, userAttrs, c.attr)
          request(app)
            .post('/api/auth/register')
            .send(paramsToUse)
            .expect(422)
            .then((resp) => {
              expect(resp.body.error).to.equal(c.message)
              done()
            })
      }) // test
    }) // forEach

  }); // register
  
  describe('CHECK TOKEN', () => {
    it('allows a valid token', (done) => {

      
      testUser.save((err) => {
        const userInfo = {
          _id: testUser._id,
          firstName: testUser.profile.firstName,
          lastName: testUser.profile.lastName,
          email: testUser.email,
          role: testUser.role,
        }
        
        const expectedToken = 'JWT ' + generateToken(userInfo)
        console.log(expectedToken);
        request(app)
          .get('/api/auth/protected')
          .set('Authorization', expectedToken)
        .expect(200, done);
      }) // save
    })
    
    it('rejects a bogus token', (done) => {
      testUser.save((err) => {
  
        const expectedToken = 'bogus_token'
        request(app)
          .get('/api/auth/protected')
          .set('Authorization', expectedToken)
        .expect(401, done);
      }) // save
    })
  })
});
