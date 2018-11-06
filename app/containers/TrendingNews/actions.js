/*
 *
 * TrendingNews actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_NEW_TRENDING_NEWS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitNewTrendingNews(values, actions) {
  return {
    type: SUBMIT_NEW_TRENDING_NEWS,
    values,
    actions,
  };
}
