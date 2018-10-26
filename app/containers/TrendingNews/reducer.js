/*
 *
 * TrendingNews reducer
 *
 */

import { DEFAULT_ACTION } from './constants';
import { getState } from '../../constants/cities';

export const initialState = {
  states: getState(),
  selectedState: '',
};

function trendingNewsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default trendingNewsReducer;
