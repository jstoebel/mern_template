import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';

import cookie from 'react-cookie';

import {Router, browserHistory} from 'react-router';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');

if (token) {
  store.dispatch({type: AUTH_USER});
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('#root')
);
