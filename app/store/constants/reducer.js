/*
 *
 * constants reducer
 *
 */

import { DEFAULT_ACTION, SET_CONSTANTS } from './constants';

export const initialState = {};

function constantsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_CONSTANTS:
      return action.constants;
    default:
      return state;
  }
}

export default constantsReducer;
