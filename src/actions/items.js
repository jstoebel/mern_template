import C from './constants';

export function addRecipe() {
  return {
    type: C.CREATE_RECIPE,
  };
}

export function editRecipe(idx, recipe) {
  // merge recpie attributes into an existing recipe at index

  return {
    type: C.UPDATE_RECIPE,
    payload: {idx: idx, recipe: recipe},
  };
}
export function removeRecipe(idx) {
  // remove the recipe at idx

  return {
    type: C.DESTROY_RECIPE,
    payload: {idx: idx},
  };
}

export function removeAll() {
  return {
    type: C.DESTROY_ALL,
  };
}
