import { createSelector } from 'reselect';

/**
 * Direct selector to the helpline state domain
 */

const selectHelplineDomain = state => state.helpline;

/**
 * Other specific selectors
 */

const makeSelectHelplines = () =>
  createSelector(selectHelplineDomain, substate => substate.helplineList);

const makeSelectSelectedHelpline = () =>
  createSelector(selectHelplineDomain, substate => substate.selectedHelpline);

export default makeSelectHelplines;
export {
  selectHelplineDomain,
  makeSelectSelectedHelpline,
  makeSelectHelplines,
};
