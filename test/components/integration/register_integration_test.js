/* global describe it beforeEach Promise*/
import {createStore} from 'redux';

import {expect} from 'chai';
import {Field} from 'redux-form';
import jsdom from 'jsdom';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import React from 'react';
import reducers from '../../../src/reducers/index';
import Register from '../../../src/components/ui/Register';
import RegisterContainer from '../../../src/components/containers/RegisterContainer';
import sinon from 'sinon';

// https://github.com/airbnb/enzyme/issues/341
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
/*
  we need to hook up the Registe component to redux and redux-form
*/


describe('<RegisterContainer/>', () => {
  let store;
  let registerUserSpy; // the action dispatch we need to spy on
  let container;
  let register; // the register component
  let initialState;


  beforeEach((done) => {
    initialState = {
      auth: {
        error: 'an error occured.',
        message: 'message for you sir!',
      },
      form: {},
    };

    store = createStore(reducers, initialState);
    registerUserSpy = sinon.stub().returns(Promise.resolve());

    container = mount(
      <Provider store={store}>
        <RegisterContainer registerUser={registerUserSpy} />
      </Provider>
    );

    register = container.find(Register).first();
    done();
  });

  describe('registerUser', () => {
    let fieldInput = [
      {name: 'firstName', value: 'Jacob', humanName: 'a first name'},
      {name: 'lastName', value: 'Stoebel', humanName: 'a last name'},
      {name: 'email', value: 'test@test.com', humanName: 'an email'},
      {name: 'password', value: '123', humanName: 'a password'},
    ];
    let form;
    beforeEach((done) => {
      form = register.find('form').first();
      done();
    });

    it('is successful with valid input', (done) => {
      // enter something for each field
      fieldInput.forEach((fi) => {
        const input = form.find(Field).find({name: fi.name}).first();
        input.simulate('change', {target: {value: fi.value}});
      });
      form.simulate('submit');
      expect(registerUserSpy.callCount).to.equal(1);
      done();
    });

    fieldInput.forEach((fi) => {
      it(`fails with invalid ${fi.name}`, (done) => {
        // click out of the field
        form.find(Field).find({name: fi.name}).first()
          .simulate('blur');

        /*
          gotcha: when the component rerenders, the original node you grabed
          from enzyme will not reflect this change. Grab it again!
        */
        expect(
          form.find(Field).find('.error').text()
        ).to.equal(`Please enter ${fi.humanName}`);
        expect(registerUserSpy.callCount).to.equal(0);
        done();
      });
    });
  });

  // it('calls registerUser', (done) => {
  //   // input.simulate('change', { target: { value: 'Joe' } })
  //
  //   // simulate a change event (typing in text)
  //   // fieldNames.forEach((name) => {
  //   //   field = register.find(Field).
  //   // })
  //
  //   form.simulate('submit')
  //   expect(registerUserSpy.callCount).to.equal(1)
  //   done();
  // })

  it('passes messages from store', (done) => {
    expect(register.props().errorMessage).to.equal(initialState.auth.error);
    expect(register.props().message).to.equal(initialState.auth.message);
    done();
  });
});
