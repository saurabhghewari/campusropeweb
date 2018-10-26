/*
 *
 * logged user reducer
 *
 */

import { DEFAULT_ACTION, SET_LOGGED_USER } from './constants';

export const initialState = {
  user: null,
};

function loggedReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOGGED_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
}

export default loggedReducer;
