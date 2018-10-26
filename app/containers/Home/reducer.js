/*
 *
 * Home reducer
 *
 */

import { DEFAULT_ACTION } from './constants';

export const initialState = {};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default homeReducer;
