/* global describe it */

import {createStore} from 'redux';
import {expect} from 'chai';
import jsdom from 'jsdom';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import React from 'react';
import {Redirect} from 'react-router';
import reducers from '../../../src/reducers/index';
import requireAuth from '../../../src/components/containers/AuthenticationContainer';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('<AuthenticatonContainer/>', () => {
  it('renders when authenticated is true', (done) => {
    // set up a store where user is authenticated
    let Spam = () => (
     <div>Hello from Spam!!</div>
    );
    let initialState = {
      auth: {
        authenticated: true,
      },
    };
    let store = createStore(reducers, initialState);
    const DecoratedSpam = requireAuth(Spam);
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <DecoratedSpam/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(Spam)).to.have.length(1);
    done();
  });

  it('redirects when authenticated is false', (done) => {
    // setup store where user it not authenticated
    let Spam = () => (
     <div>Hello from Spam!!</div>
    );
    let initialState = {
      auth: {
        authenticated: false,
      },
    };
    let store = createStore(reducers, initialState);
    const DecoratedSpam = requireAuth(Spam);
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <DecoratedSpam/>
        </Provider>
      </MemoryRouter>
    );


    expect(wrapper.find(Spam)).to.have.length(0);
    const redirects = wrapper.find(Redirect);
    expect(redirects).to.have.length(1);
    expect(redirects.first().prop('to'))
      .to.equal('/login');

    done();
  });
});
