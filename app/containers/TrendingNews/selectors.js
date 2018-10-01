import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trendingNews state domain
 */

const selectTrendingNewsDomain = state =>
  state.get('trendingNews', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TrendingNews
 */

const makeSelectTrendingNews = () =>
  createSelector(selectTrendingNewsDomain, substate => substate.toJS());

export default makeSelectTrendingNews;
export { selectTrendingNewsDomain };
