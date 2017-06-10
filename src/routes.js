import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/ui/app';
import NotFoundPage from './components/pages/not-found-page';

import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import requireAuth from './components/containers/AuthenticationContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={requireAuth(Dashboard)} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
