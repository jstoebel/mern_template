/* global describe it */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {Field} from 'redux-form'
import {Alert} from 'react-bootstrap';
import sinon from 'sinon';
import Login from '../../../src/components/ui/Login';

describe('<Login/>', () => {
  let wrapper;
  let handleSubmit = sinon.spy()
  let loginUser = sinon.spy()
  beforeEach((done) => {
    wrapper = shallow(<Login 
      handleSubmit={handleSubmit}
      loginUser={loginUser}
    /> );
    sinon.spy(Login.prototype, 'handleFormSubmit')
    done()
  })

  describe('renders fields', () => {
    let fields;
    beforeEach((done) => {
      fields = wrapper.find(Field)
      done();
    })
    const fieldNames = ['email', 'password'];
    fieldNames.forEach((name) => {
      it(`renders ${name}`, (done) => {
        expect(fields.find({name: name})).to.have.length(1)
        done();
      })
    })

  })

  it('renders error message', (done) => {
    const msg = 'Something went wrong'
    wrapper.setProps({errorMessage: msg})
    expect(
        wrapper.find(Alert)
          .find('span')
          .text()
    ).to.equal(`Error! ${msg}`)
    
    done();
  })

  it('handles form submit', (done) => {
    const form = wrapper.find('form').first()
    form.simulate('submit')
    
    /*
      since this is just an empty spy, it won't call handleFormSubmit.
      we test that in the integration test
    */
    expect(handleSubmit.calledOnce).to.equal(true)
    
    done();
  })
  
})
