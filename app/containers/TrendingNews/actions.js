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
  FETCH_TRENDING_NEWS_BY_ID,
  SET_SELECTED_TRENDING_NEWS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchTrendingNews(state='all') {
  return {
    type: FETCH_TRENDING_NEWS,
    state
  };
}

export function setTrendingNews(trendingNews) {
  return {
    type: SET_TRENDING_NEWS,
    trendingNews,
  };
}

export function fetchTrendingNewsById(trendingNewsId) {
  return {
    type: FETCH_TRENDING_NEWS_BY_ID,
    trendingNewsId,
  };
}

export function setSelectedTrendingNewsInView(selectedTrendingNews) {
  return {
    type: SET_SELECTED_TRENDING_NEWS,
    selectedTrendingNews,
  };
}

export function submitNewTrendingNews(values, actions) {
  return {
    type: SUBMIT_NEW_TRENDING_NEWS,
    values,
    actions,
  };
}
