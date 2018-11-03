/*
 *
 * Home actions
 *
 */

import { DEFAULT_ACTION, HOME_MOUNTED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function homeMounted() {
  return {
    type: HOME_MOUNTED,
  };
}
