/*
 *
 * UserProfile actions
 *
 */

import {
  DEFAULT_ACTION,
  PROFILE_TAB_SELECTION_ACTION,
  PROFILE_INFO_FETCH_SUCCESS_ACTION,
} from './constants';

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

export function setUserProfileAction(userProfile) {
  return {
    type: PROFILE_INFO_FETCH_SUCCESS_ACTION,
    userProfile,
  };
}
