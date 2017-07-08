/* global describe it beforeEach */

import App from '../../../src/components/ui/App';
import {expect} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';

describe('<App/>', () => {
  let wrapper;
  const locations = ['register', 'login', 'dashboard', 'nowhere'];
  beforeEach((done) => {
    wrapper = shallow(<App />);
    done();
  });

  locations.forEach((loc) => {
    it(`contains a link to ${loc}`, (done) => {
      expect(wrapper.find({to: loc})).to.have.length(1);
      done();
    });
  });
});
