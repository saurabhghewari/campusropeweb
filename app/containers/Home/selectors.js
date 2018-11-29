import { createSelector } from 'reselect';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.home;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(selectHomeDomain, substate => substate);

const makeSelectIsFetchingData = () =>
  createSelector(selectHomeDomain, substate => substate.isFetchingData);

const makeSelectSnackData = () =>
  createSelector(selectHomeDomain, substate => substate.snackData);

export default makeSelectHome;
export { selectHomeDomain, makeSelectIsFetchingData, makeSelectSnackData };
