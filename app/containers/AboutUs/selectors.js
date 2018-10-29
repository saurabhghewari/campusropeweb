import { createSelector } from 'reselect';

/**
 * Direct selector to the aboutUs state domain
 */

const selectAboutUsDomain = state => state.aboutUs;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AboutUs
 */

const makeSelectAboutUs = () =>
  createSelector(selectAboutUsDomain, substate => substate);

export default makeSelectAboutUs;
export { selectAboutUsDomain };
