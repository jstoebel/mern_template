import {applyMiddleware, createStore} from 'redux';
import startingState from './initialState.json';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';


/* set up of store
  1) pull state from browser
  2) creates the store with middle ware and initial state
  3) add subscription to store so its saved to browser localStorage

*/

// either pulls local storage or, if its absent, grabs from sample data
const initialState = (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    startingState;

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

const saveState = () =>
  localStorage['redux-store'] = JSON.stringify(store.getState());
store.subscribe(saveState);

// REMOVE ME! attach store and cookie to window for development
window.store = store;

export default store;
