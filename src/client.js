import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './components/ui/App';
import About from './components/ui/About';
import Repos from './components/ui/Repos';
import Repo from './components/ui/Repo';
import Home from './components/ui/Home';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'));
