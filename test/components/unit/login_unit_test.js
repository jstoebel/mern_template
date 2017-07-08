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

  
})
