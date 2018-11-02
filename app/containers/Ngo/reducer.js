/*
 *
 * Ngo reducer
 *
 */

import { DEFAULT_ACTION, SET_NGOS } from './constants';

export const initialState = {
  fetchedNgos: [],
};

function ngoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_NGOS:
      return {
        ...state,
        fetchedNgos: action.ngos,
      };
    default:
      return state;
  }
}

export default ngoReducer;
