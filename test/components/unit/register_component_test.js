/* global describe it beforeEach */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {Field} from 'redux-form';
import sinon from 'sinon';
import Register from '../../../src/components/ui/Register';

describe('<Register/>', () => {
  let wrapper;
  let handleSubmit = sinon.spy();
  beforeEach((done) => {
    wrapper = shallow(<Register
      handleSubmit={handleSubmit}
    /> );
    done();
  });

  describe('renders fields', () => {
    let fields;
    beforeEach((done) => {
      fields = wrapper.find(Field);
      console.log(`there are ${fields.length} fields`);
      done();
    });
    const fieldNames = ['firstName', 'lastName', 'email', 'password'];
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
        wrapper.find('div span')
          .text()
    ).to.equal(`Error! ${msg}`)
    
    done();
  })
  
})
