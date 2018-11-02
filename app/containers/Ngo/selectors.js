import { createSelector } from 'reselect';

/**
 * Direct selector to the ngo state domain
 */

const selectNgoDomain = state => state.ngo;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ngo
 */

const makeSelectNgo = () =>
  createSelector(selectNgoDomain, substate => substate);

const makeSelectFetchedNgos = () =>
  createSelector(selectNgoDomain, substate => substate.fetchedNgos);

export default makeSelectNgo;
export { selectNgoDomain, makeSelectFetchedNgos };
