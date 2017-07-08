/* global describe it */
import LoginContainer from '../../../src/components/containers/LoginContainer'
import Login from '../../../src/components/ui/Login'
import React from 'react'

import {expect} from 'chai'
import {mount} from 'enzyme'
import sinon from 'sinon'

import reducers from '../../../src/reducers/index';

import jsdom from 'jsdom';

// https://github.com/airbnb/enzyme/issues/341
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
/*
  we need to hook up the Login component to redux and redux-form
*/

import {reducer as formReducer} from 'redux-form'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

describe('<LoginContainer/>', () => {
  
  let store;
  let loginUserSpy; // the action dispatch we need to spy on
  let container;
  let login; // the Login component
  let initialState
  beforeEach(() => {
    initialState = {
      auth: {
        error: 'an error occured.',
        message: 'message for you sir!',
      },
      form: {}
    }
    
    store = createStore(reducers, initialState)
    loginUserSpy = sinon.stub().returns(Promise.resolve());
    
    container = mount(
      <Provider store={store}>
        <LoginContainer loginUser={loginUserSpy} />
      </Provider>
    )
    
    login = container.find(Login).first()
  })
  
  it('calls loginUser', (done) => {
    const form = login.find('form').first()
    form.simulate('submit')
    expect(loginUserSpy.callCount).to.equal(1)
    done();
  })
  
  it('passes messages from store', (done) => {
    expect(login.props().errorMessage).to.equal(initialState.auth.error)
    expect(login.props().message).to.equal(initialState.auth.message)
    done();
  })
    
})
