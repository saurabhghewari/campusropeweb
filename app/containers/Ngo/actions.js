/*
 *
 * Ngo actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_NEW_NGO } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitNewNgo(values, actions) {
  return {
    type: SUBMIT_NEW_NGO,
    values,
    actions,
  };
}
