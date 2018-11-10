/*
 *
 * TrendingNews actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_NEW_TRENDING_NEWS,
  FETCH_TRENDING_NEWS,
  SET_TRENDING_NEWS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchTrendingNews() {
  return {
    type: FETCH_TRENDING_NEWS,
  };
}

export function setTrendingNews(trendingNews) {
  return {
    type: SET_TRENDING_NEWS,
    trendingNews,
  };
}

export function submitNewTrendingNews(values, actions) {
  return {
    type: SUBMIT_NEW_TRENDING_NEWS,
    values,
    actions,
  };
}
