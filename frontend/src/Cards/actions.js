import * as types from './actionTypes';

export const add = (name) => ({
  type: types.ADD_CARD,
  payload: {
    name,
  }
});

export const remove = (id) => ({
  type: types.REMOVE_CARD,
  payload: {
    id
  }
});

export const toggleSticky = (id) => ({
  type: types.TOGGLE_CARD_STICKY,
  payload: {
    id
  }
});
