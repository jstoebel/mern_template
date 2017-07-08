/* global describe it */
import DashboardContainer from '../../../src/components/containers/DashboardContainer';
import Dashboard from '../../../src/components/ui/Dashboard';
import React from 'react';

import {expect} from 'chai';
import {mount} from 'enzyme';
import sinon from 'sinon';
import reducers from '../../../src/reducers/index';

import jsdom from 'jsdom';

// https://github.com/airbnb/enzyme/issues/341
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

/*
  we need to hook up the Dashboard component to redux and redux-form
*/

import {createStore} from 'redux';
import {Provider} from 'react-redux';

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
    const protectedTestSpy = sinon.spy(); // we need to provide this action for the component

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
