import C from '../constants';
import {combineReducers} from 'redux';

export const items = (state=[], action) => {
  // acts on an ARRAY of recipes
  let newItems = state.slice();
  switch (action.type) {
    case C.CREATE_ITEM:
      return newItems;

    case C.UPDATE_ITEM:
      return newItems;
    case C.DESTROY_ITEM:
      return newItems;

    case C.DESTROY_ALL:
      return newItems;

    default:
      return state;

  }
};

const user = (state = {
  isWaiting: false,
  authenticated: false,
  email: '',
}, action) => {
  switch (action.type) {
    case C.MANUAL_LOGIN_USER:
      return Object.assign({}, state, {isWaiting: true});
    case C.LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
          isWaiting: false, authenticated: true, email: action.data.email,
        }
      );
    case C.LOGIN_ERROR_USER:
      return Object.assign({}, state, {isWaiting: false, authenticated: false});
    case C.SIGNUP_USER:
      return Object.assign({}, state, {isWaiting: true});
    case C.SIGNUP_SUCCESS_USER:
      return Object.assign({}, state, {isWaiting: false, authenticated: true});
    case C.SIGNUP_ERROR_USER:
      return Object.assign({}, state, {isWaiting: false, authenticated: false});
    case C.LOGOUT_USER:
      return Object.assign({}, state, {isWaiting: true});
    case C.LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {isWaiting: false, authenticated: false, email: ''});
    case C.LOGOUT_ERROR_USER:
      return Object.assign({}, state, {isWaiting: false, authenticated: true});
    case C.REGISTER_USER:
      return Object.assign({}, state, {isWaiting: true});
    case C.REGISTER_SUCCESS_USER:
      return Object.assign({}, state, {isWaiting: false});
    case C.REGISTER_ERROR_USER:
      return Object.assign({}, state, {isWaiting: false});
    default:
      return state;
  }
};

export default combineReducers({
  items,
  user,
});
