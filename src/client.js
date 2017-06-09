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
import LoginContainer from './components/containers/LoginContainer';
import RegisterContainer from './components/containers/RegisterContainer';
import MyProfileContainer from './components/containers/MyProfileContainer';

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



const requireAuth = (nextState, replace, callback) => {
  const { user: { authenticated } } = store.getState()		
  if (!authenticated) {			
    // Takes a Location object
    // https://github.com/mjackson/history/blob/master/docs/Location.md
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname }
    })
  }
  callback()
}

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="login" component={LoginContainer} />
        <Route path="register" component={RegisterContainer} />
        <Route path="myprofile" component={MyProfileContainer} onEnter={requireAuth} />
        <Route path="/repos" component={Repos}>
          <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
