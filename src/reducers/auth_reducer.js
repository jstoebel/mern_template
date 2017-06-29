import C from '../constants';

// if no state provided, what should it be?
const INITIAL_STATE = {error: '', message: '', content: '', authenticated: false};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case C.AUTH_USER:
      return {...state, error: '', message: 'welcome!', authenticated: true};
    case C.UNAUTH_USER:
      return {...state, authenticated: false};
    case C.AUTH_ERROR:
      return {...state, error: action.payload};
    case C.PROTECTED_TEST:
      return {...state, content: action.payload};
  }
  return state;
}
