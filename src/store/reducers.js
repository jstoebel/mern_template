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

export default combineReducers({
  items,
});
