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
  DELETE_SELECTED_TRENDING_NEWS,
  FETCH_NEWS_CLIENTS,
  SET_NEWS_CLIENTS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchTrendingNews(state = 'all') {
  return {
    type: FETCH_TRENDING_NEWS,
    state,
  };
}
export function fetchNewsClients() {
  return {
    type: FETCH_NEWS_CLIENTS,
  };
}

export function setNewsClients(clients) {
  return {
    type: SET_NEWS_CLIENTS,
    clients,
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

export function deleteSelectedTrendingNews(trendingNewsId) {
  return {
    type: DELETE_SELECTED_TRENDING_NEWS,
    trendingNewsId,
  };
}
