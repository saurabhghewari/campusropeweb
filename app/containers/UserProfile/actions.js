/*
 *
 * UserProfile actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_USER_PROFILE,
  SET_USER_PROFILE,
  SAVE_USER_PROFILE,
  PROFILE_TAB_SELECTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchUserProfile(payload) {
  return {
    type: FETCH_USER_PROFILE,
    payload,
  };
}

export function tabSelectAction(selectedTab) {
  return {
    type: PROFILE_TAB_SELECTION,
    selectedTab,
  };
}

export function setUserProfile(userProfile) {
  return {
    type: SET_USER_PROFILE,
    userProfile,
  };
}

export function saveUserProfile(payload, actions) {
  return {
    type: SAVE_USER_PROFILE,
    payload,
    actions,
  };
}
