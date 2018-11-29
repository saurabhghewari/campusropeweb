/*
 *
 * Home reducer
 *
 */

import {
  DEFAULT_ACTION,
  START_FETCHING_DATA,
  STOP_FETCHING_DATA,
} from './constants';

export const initialState = {
  isFetchingData: false,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case START_FETCHING_DATA:
      return { ...state, isFetchingData: true };
    case STOP_FETCHING_DATA:
      return { ...state, isFetchingData: false };
    default:
      return state;
  }
}

export default homeReducer;
