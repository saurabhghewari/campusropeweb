import { createSelector } from 'reselect';
import {
  userDrawerMenus,
  adminDrawerMenus,
  adminHomeMenus,
  userHomeMenus,
} from './menus';

const selectLoggedUserDomain = state => state.loggedUser;

const makeSelectLoggedUser = () =>
  createSelector(selectLoggedUserDomain, loggedUser => loggedUser.user);

const makeSelectLoggedUserMenus = () =>
  createSelector(selectLoggedUserDomain, loggedUserState => {
    if (loggedUserState.user && loggedUserState.user.role === 'user') {
      return userDrawerMenus;
    }
    if (loggedUserState.user && loggedUserState.user.role === 'admin') {
      return adminDrawerMenus;
    }
    return [];
  });

const makeSelectLoggedUserHomeMenus = () =>
  createSelector(selectLoggedUserDomain, loggedUserState => {
    if (loggedUserState.user && loggedUserState.user.role === 'user') {
      return userHomeMenus;
    }
    if (loggedUserState.user && loggedUserState.user.role === 'admin') {
      return adminHomeMenus;
    }
    return [];
  });

const makeSelectIsLoggedUser = userId =>
  createSelector(
    selectLoggedUserDomain,
    loggedUser => loggedUser.user._id === userId,
  );

export default makeSelectLoggedUser;
export {
  selectLoggedUserDomain,
  makeSelectLoggedUser,
  makeSelectLoggedUserMenus,
  makeSelectLoggedUserHomeMenus,
  makeSelectIsLoggedUser,
};
