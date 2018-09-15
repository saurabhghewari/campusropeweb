/*
 *
 * Login actions
 *
 */

import { DEFAULT_ACTION, LOGIN_FORM_SUBMIT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function onLoginFormSubmit(values, actions) {
  return {
    type: LOGIN_FORM_SUBMIT,
    values,
    actions,
  };
}
