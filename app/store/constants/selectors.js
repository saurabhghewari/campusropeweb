import { createSelector } from 'reselect';
import _groupBy from 'lodash/groupBy';

const selectConstantsDomain = state => state.constants;

const makeSelectCities = () =>
  createSelector(selectConstantsDomain, substate => substate.CITIES);
const makeSelectNgoTypes = () =>
  createSelector(selectConstantsDomain, substate =>
    Object.values(substate.NGO_TYPES),
  );
const makeSelectStates = () =>
  createSelector(selectConstantsDomain, substate =>
    Object.keys(_groupBy(substate.CITIES, 'state')),
  );

export default selectConstantsDomain;
export {
  selectConstantsDomain,
  makeSelectNgoTypes,
  makeSelectStates,
  makeSelectCities,
};
