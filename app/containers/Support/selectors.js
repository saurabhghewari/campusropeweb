import { createSelector } from 'reselect';

/**
 * Direct selector to the support state domain
 */

const selectSupportDomain = state => state.support;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Support
 */

const makeSelectSupport = () =>
  createSelector(selectSupportDomain, substate => substate);

export default makeSelectSupport;
export { selectSupportDomain };
