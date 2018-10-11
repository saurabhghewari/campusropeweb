import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminTask state domain
 */

const selectAdminTaskDomain = state =>
  state.get('adminTask', initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminTask
 */

const makeSelectAdminTask = () =>
  createSelector(selectAdminTaskDomain, substate => substate.tasks);

const makeSelectSelectedAdminTask = () =>
  createSelector(selectAdminTaskDomain, state =>
    state.tasks.filter(task => task.selected),
  );

export default makeSelectAdminTask;
export { makeSelectAdminTask, makeSelectSelectedAdminTask };
