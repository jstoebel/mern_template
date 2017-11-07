import {makeMainRoutes} from './routes'

import C from './constants';

import {render} from 'react-dom';

import cookie from 'react-cookie';
import store from './store'
// if user has a token mark them as logged in
window.cookie = cookie;
const token = cookie.load('token');

if (token) {
  store.dispatch({type: C.AUTH_USER});
}

render(
  makeMainRoutes(),
  document.querySelector('#root')
);
