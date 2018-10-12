import { SET_LOGGED_USER } from './constants';

export function setLoggedUser(user) {
  return {
    type: SET_LOGGED_USER,
    user,
  };
}
