/* global describe it */
import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import {Link} from 'react-router-dom';
import App from '../../../src/components/ui/App';

describe('<App/>', () => {
  let wrapper;
  const locations = ['register', 'login', 'dashboard', 'nowhere']
  beforeEach((done) => {
    wrapper = shallow(<App />);
    done()
  })
  
  locations.forEach((loc) => {
    it(`contains a link to ${loc}`, (done) => {
      expect(wrapper.find({to: loc})).to.have.length(1)
      done();
    })
  })
  
  
})
