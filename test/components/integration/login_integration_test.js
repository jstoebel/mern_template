/* global describe it */
import LoginContainer from '../../../src/components/containers/LoginContainer'
import Login from '../../../src/components/ui/Login'
import React from 'react'

import {expect} from 'chai'
import {mount} from 'enzyme'
import sinon from 'sinon'

import reducers from '../../../src/reducers/index';


/*
  we need to hook up the Login component to redux and redux-form
*/

import {reducer as formReducer} from 'redux-form'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

describe('LoginContainer', () => {
  
  let store;
  let loginUser; // the action dispatch we need to stub
  let subject;
  
  beforeEach(() => {
    const initialState = {
      auth: {
        error: 'an error occured.',
        message: 'message for you sir!',
      },
      form: {}
    }
    
    store = createStore(reducers, initialState)
    loginUser = sinon.stub().returns(Promise.resolve())
    const props = {
      loginUser,
    }
    sinon.spy(Login.prototype, 'handleFormSubmit');
    subject = mount(
      <Provider store={store}>
        <LoginContainer {...props}/>
      </Provider>
    )
  })
  
  it('calls handleFormSubmit', (done) => {
    
    const form = subject.find('form').first()
    form.simulate('submit')
    expect(Login.prototype.handleFormSubmit.calledOnce).to.be(true)
    done();
  })
  
  it.skip('calls loginUser', (done) => {
    done();
  })
  
})
