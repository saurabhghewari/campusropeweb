import { createSelector } from 'reselect';

/**
 * Direct selector to the signup state domain
 */

const selectSignupDomain = state => state.signup;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Signup
 */

const makeSelectSignup = () =>
  createSelector(selectSignupDomain, substate => substate);

export default makeSelectSignup;
export { selectSignupDomain };
