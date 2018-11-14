import { createSelector } from 'reselect';

/**
 * Direct selector to the myAdminTasks state domain
 */

const selectMyAdminTasksDomain = state => state.myAdminTasks;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyAdminTasks
 */

const makeSelectMyAdminTasks = () =>
  createSelector(selectMyAdminTasksDomain, substate => substate);

export default makeSelectMyAdminTasks;
export { selectMyAdminTasksDomain };
