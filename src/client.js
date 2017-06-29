import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import App from './components/ui/app';
import HomePage from './components/pages/home-page';
import Register from './components/containers/RegisterContainer';
import Login from './components/containers/LoginContainer';
import Dashboard from './components/containers/DashboardContainer';
import requireAuth from './components/containers/AuthenticationContainer';
import NotFoundPage from './components/pages/not-found-page';

import C from './constants';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';

import cookie from 'react-cookie';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

window.store = store;
window.cookie = cookie;

const token = cookie.load('token');

if (token) {
  store.dispatch({type: C.AUTH_USER});
}

render(
  <BrowserRouter>
    <div>
      <Provider store={store}>
        <App>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={requireAuth(Dashboard)} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </App>
      </Provider>
    </div>
  </BrowserRouter>,
  document.querySelector('#root')
);
