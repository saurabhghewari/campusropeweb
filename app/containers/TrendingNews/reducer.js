/*
 *
 * TrendingNews reducer
 *
 */

import {
  DEFAULT_ACTION,
  SET_TRENDING_NEWS,
  SET_SELECTED_TRENDING_NEWS,
} from './constants';
/* eslint-disable*/
export const initialState = {
  trendingNewsList: [],
  selectedTrendingNews: {},
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
    case SET_SELECTED_TRENDING_NEWS:
      return {
        ...state,
        selectedTrendingNews: action.selectedTrendingNews,
      };
    default:
      return state;
  }
}

export default trendingNewsReducer;
