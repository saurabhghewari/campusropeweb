/*
 *
 * UserProfile actions
 *
 */

import {
  DEFAULT_ACTION,
  PROFILE_INFO_FETCH_ACTION,
  PROFILE_TAB_SELECTION_ACTION,
  PROFILE_INFO_FETCH_SUCCESS_ACTION,
  PROFILE_VALUE_ADD_ACTION,
  PROFILE_VALUE_REMOVE_ACTION,
  SAVE_PROFILE_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchUserProfileAction(payload) {
  return {
    type: PROFILE_INFO_FETCH_ACTION,
    payload,
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

export function addValueAction(key) {
  return {
    type: PROFILE_VALUE_ADD_ACTION,
    key,
  };
}

export function saveProfileAction(payload) {
  return {
    type: SAVE_PROFILE_ACTION,
    payload,
  };
}

export function removeValueAction(key) {
  return {
    type: PROFILE_VALUE_REMOVE_ACTION,
    key,
  };
}
