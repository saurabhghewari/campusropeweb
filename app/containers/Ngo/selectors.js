import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ngo state domain
 */

const selectNgoDomain = state => state.get('ngo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ngo
 */

const makeSelectNgo = () =>
  createSelector(selectNgoDomain, substate => substate.toJS());

export default makeSelectNgo;
export { selectNgoDomain };
