/* global describe it */
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Redirect} from 'react-router';
import sinon from 'sinon';
import requireAuth from '../../../src/components/containers/AuthenticationContainer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../../src/reducers/index';
import jsdom from 'jsdom';
import {BrowserRouter, MemoryRouter, Route, Switch} from 'react-router-dom';

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
