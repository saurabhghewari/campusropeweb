import { createSelector } from 'reselect';

/**
 * Direct selector to the trendingNews state domain
 */

const selectTrendingNewsDomain = state => state.trendingNews;

const makeSelectTrendingNews = () =>
  createSelector(
    selectTrendingNewsDomain,
    substate => substate.trendingNewsList,
  );

const makeSelectSelectedTrendingNews = () =>
  createSelector(
    selectTrendingNewsDomain,
    substate => substate.selectedTrendingNews,
  );
export default selectTrendingNewsDomain;
export { makeSelectTrendingNews, makeSelectSelectedTrendingNews };
