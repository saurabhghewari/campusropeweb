import { createSelector } from 'reselect';

/**
 * Direct selector to the trendingNews state domain
 */

const selectTrendingNewsDomain = state => state.trendingNews;

/**
 * Other specific selectors
 */
const getStates = () =>
  createSelector(selectTrendingNewsDomain, substate => substate.states);

export default getStates;
export { selectTrendingNewsDomain, getStates };
