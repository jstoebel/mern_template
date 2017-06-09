import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import sampleData from './initialState.json';
import appReducer from './store/reducers';


import App from './components/ui/App';
import About from './components/ui/About';
import Repos from './components/ui/Repos';
import Repo from './components/ui/Repo';
import Home from './components/ui/Home';

// either pulls local storeage or, if its absent, grabs from sample data
const initialState = (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    sampleData;

let store = createStore(appReducer, initialState);

const saveState = () =>
  localStorage['redux-store'] = JSON.stringify(store.getState());

store.subscribe(saveState);

window.React = React;
window.store = store;


render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/repos" component={Repos}>
          <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
