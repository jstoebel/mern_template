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
  let loginUserSpy; // the action dispatch we need to spy on
  let container;
  
  beforeEach(() => {
    const initialState = {
      auth: {
        error: 'an error occured.',
        message: 'message for you sir!',
      },
      form: {}
    }
    
    store = createStore(reducers, initialState)
    loginUserSpy = sinon.stub().returns(Promise.resolve());
    
    const props = {
      loginUserSpy,
    }
    
    container = mount(
      <Provider store={store}>
        <LoginContainer loginUser={loginUserSpy} />
      </Provider>
    )
  })
  
  it('calls loginUser', (done) => {
    const form = container
      .find(Login).first()
      .find('form').first()
    
    form.simulate('submit')
    expect(loginUserSpy.callCount).to.equal(1)
    done();
  })
  
})
