/*
 *
 * UserProfile actions
 *
 */

import { DEFAULT_ACTION, PROFILE_TAB_SELECTION_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function tabSelectAction(selectedTab) {
  return {
    type: PROFILE_TAB_SELECTION_ACTION,
    selectedTab,
  };
}
