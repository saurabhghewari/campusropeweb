import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trendingNews state domain
 */

const selectTrendingNewsDomain = state =>
  state.get('trendingNews', initialState).toJS();

/**
 * Other specific selectors
 */
const getStates = () =>
  createSelector(selectTrendingNewsDomain, substate => substate.states);

export default getStates;
export { selectTrendingNewsDomain, getStates };
