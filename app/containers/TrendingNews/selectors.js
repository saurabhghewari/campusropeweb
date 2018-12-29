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

const makeSelectNewsClients = () =>
  createSelector(selectTrendingNewsDomain, substate => substate.newsClients);

const makeSelectNewsClientsForOptions = () =>
  createSelector(selectTrendingNewsDomain, substate =>
    substate.newsClients.map(client => ({
      label: client.name,
      value: client._id,
      logourl: client.logourl,
    })),
  );
export default selectTrendingNewsDomain;
export {
  makeSelectTrendingNews,
  makeSelectSelectedTrendingNews,
  makeSelectNewsClients,
  makeSelectNewsClientsForOptions,
};
