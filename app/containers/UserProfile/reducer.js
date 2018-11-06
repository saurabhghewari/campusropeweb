/*
 *
 * UserProfile reducer
 *
 */

import {
  DEFAULT_ACTION,
  PROFILE_TAB_SELECTION_ACTION,
  PROFILE_INFO_FETCH_SUCCESS_ACTION,
  PROFILE_VALUE_ADD_ACTION,
  PROFILE_VALUE_REMOVE_ACTION
} from './constants';
import ProfileTabType from './ProfileTabTypeModel';
import { selectUserProfileInfo } from './selectors'

export const initialState = {
  selectedTab: ProfileTabType.typeTypeMap.POST_TAB,
  userProfileInfo: {},
};

function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PROFILE_INFO_FETCH_SUCCESS_ACTION:
      return {
        ...state,
        userProfileInfo: action.userProfile,
      };
    case PROFILE_TAB_SELECTION_ACTION:
      return {
        ...state,
        selectedTab: action.selectedTab,
      };
    case PROFILE_VALUE_ADD_ACTION:
      let { key } = action;
      let selectedProfileDetails = state.userProfileInfo[key] || [];
      let newSelectedProfileDetails = [...selectedProfileDetails, {value: ""}];
      let updatedUserProfileInfo = { ...state.userProfileInfo, key: newSelectedProfileDetails }
      let newState = {
        ...state
      }
      return newState;
    case PROFILE_VALUE_REMOVE_ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default userProfileReducer;
