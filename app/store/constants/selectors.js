import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoggedUserDomain = state => state.get('loggedUser', initialState);

const makeSelectLoggedUser = () =>
  createSelector(selectLoggedUserDomain, substate => substate.toJS());

export default makeSelectLoggedUser;
export { selectLoggedUserDomain };
