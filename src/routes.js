import React from 'react';
// import {IndexRoute} from 'react-router';
import {Route, IndexRoute} from 'react-router';

console.log("testing router methods");
console.log(`Route ${Route !== undefined}`);
console.log(`IndexRoute ${IndexRoute !== undefined}`);

import App from './components/ui/app';
import NotFoundPage from './components/pages/not-found-page';

import HomePage from './components/pages/home-page';
import Register from './components/containers/RegisterContainer';
import Login from './components/containers/LoginContainer';
import Dashboard from './components/ui/Dashboard';
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
