/* global describe it beforeEach*/

import Dashboard from '../../../src/components/ui/Dashboard';
import {expect} from 'chai';
import jsdom from 'jsdom';
import {mount} from 'enzyme';
import React from 'react';
import sinon from 'sinon';

// https://github.com/airbnb/enzyme/issues/341
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('<Dashboard/>', () => {
  let wrapper;
  beforeEach((done) => {
    const protectedTestSpy = sinon.spy();
    wrapper = mount(<Dashboard protectedTest={protectedTestSpy}/> );
    done();
  });

  it('calls protectedTest', (done) => {
    expect(wrapper.props().protectedTest.calledOnce).to.equal(true);
    done();
  });

  it('renders content', (done) => {
    const content = 'this is some content';
    wrapper.setProps({content: content});
    expect(wrapper.find('p').first().text()).to.equal(content);
    done();
  });
});
