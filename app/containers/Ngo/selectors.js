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

export default makeSelectNgo;
export { selectNgoDomain };
