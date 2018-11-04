import { createSelector } from 'reselect';

/**
 * Direct selector to the ngo state domain
 */

const selectNgoDomain = state => state.ngo;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ngo
 */

const makeSelectNgo = () =>
  createSelector(selectNgoDomain, substate => substate);

const makeSelectFetchedNgos = () =>
  createSelector(selectNgoDomain, substate => substate.fetchedNgos);

const makeSelectPendingNgos = () =>
  createSelector(selectNgoDomain, substate =>
    substate.fetchedNgos.filter(ngo => ngo.status === 'PENDING'),
  );

const makeSelectApprovedNgos = () =>
  createSelector(selectNgoDomain, substate =>
    substate.fetchedNgos.filter(ngo => ngo.status === 'APPROVED'),
  );

const makeSelectInViewNgo = () =>
  createSelector(selectNgoDomain, substate => substate.inViewNgo);

export default makeSelectNgo;
export {
  selectNgoDomain,
  makeSelectFetchedNgos,
  makeSelectPendingNgos,
  makeSelectApprovedNgos,
  makeSelectInViewNgo,
};
