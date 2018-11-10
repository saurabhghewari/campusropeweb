/*
 *
 * TrendingNews reducer
 *
 */

import { DEFAULT_ACTION, SET_TRENDING_NEWS } from './constants';
import { getState } from '../../constants/cities';
/* eslint-disable*/
export const initialState = {
  states: getState(),
  trendingNewsList: [],
};

function trendingNewsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_TRENDING_NEWS:
      return {
        ...state,
        trendingNewsList: action.trendingNews,
      };
    default:
      return state;
  }
}

export default trendingNewsReducer;
