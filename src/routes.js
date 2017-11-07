import React from 'react'
import HomePage from './components/pages/home-page';
import history from './history';
import NotFoundPage from './components/pages/not-found-page';import {Provider} from 'react-redux';
import Auth from './Auth/Auth';
import Dashboard from './components/containers/DashboardContainer';
import {Router, Route, Switch} from 'react-router-dom';
import store from './store';
import App from './components/ui/App';
import authCallback from './components/ui/authCallback';


// set up for auth0
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Provider store={store}>
          <App auth={auth}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route
                path="/dashboard"
                render={(props) => <Dashboard auth={auth} {...props}/>}
              />

              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return (<authCallback />);
              }}/>

              <Route path="*" component={NotFoundPage} />

            </Switch>
          </App>
        </Provider>
      </div>
    </Router>
  );
}