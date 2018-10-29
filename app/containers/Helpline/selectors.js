import { createSelector } from 'reselect';

/**
 * Direct selector to the helpline state domain
 */

const selectHelplineDomain = state => state.helpline;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Helpline
 */

const makeSelectHelpline = () =>
  createSelector(selectHelplineDomain, substate => substate);

export default makeSelectHelpline;
export { selectHelplineDomain };
