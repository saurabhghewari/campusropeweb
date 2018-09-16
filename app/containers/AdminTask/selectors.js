import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminTask state domain
 */

const selectAdminTaskDomain = state => state.get('adminTask', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminTask
 */

const makeSelectAdminTask = () =>
  createSelector(selectAdminTaskDomain, substate => substate.toJS());

export default makeSelectAdminTask;
export { selectAdminTaskDomain };
