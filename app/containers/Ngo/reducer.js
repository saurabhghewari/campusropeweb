/*
 *
 * Ngo reducer
 *
 */

import { DEFAULT_ACTION, SET_NGOS, SET_INVIEW_NGO } from './constants';

export const initialState = {
  fetchedNgos: [],
  inViewNgo: {},
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
    case SET_INVIEW_NGO:
      return {
        ...state,
        inViewNgo: action.ngo,
      };
    default:
      return state;
  }
}

export default ngoReducer;
