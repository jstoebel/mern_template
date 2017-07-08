/* global describe it beforeEach */
import {createStore} from 'redux';
import Dashboard from '../../../src/components/ui/Dashboard';
import DashboardContainer from '../../../src/components/containers/DashboardContainer';
import {expect} from 'chai';
import jsdom from 'jsdom';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import React from 'react';
import reducers from '../../../src/reducers/index';
import sinon from 'sinon';

// https://github.com/airbnb/enzyme/issues/341
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

/*
  we need to hook up the Dashboard component to redux and redux-form
*/


describe('DashboardContainer', () => {
  let store;
  let container;
  let dashboard; // the dashboard component
  let initialState;
  beforeEach(() => {
    initialState = {
      auth: {
        content: 'some content here',
      },
    };
    store = createStore(reducers, initialState);
    /*
      this spy is passed into the container's props
      and makes its way into the component
    */
    const protectedTestSpy = sinon.spy();

    container = mount(
      <Provider store={store}>
        <DashboardContainer protectedTest={protectedTestSpy} />
      </Provider>
    );

    dashboard = container.find(Dashboard).first();
  });

  it('passes content from store', (done) => {
    expect(dashboard.props().content).to.equal(initialState.auth.content);
    done();
  });
});
