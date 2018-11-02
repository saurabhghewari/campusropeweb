import { createSelector } from 'reselect';

const selectLoggedUserDomain = state => state.loggedUser;

const makeSelectLoggedUser = () =>
  createSelector(selectLoggedUserDomain, substate => substate);

export default makeSelectLoggedUser;
export { selectLoggedUserDomain, makeSelectLoggedUser };
