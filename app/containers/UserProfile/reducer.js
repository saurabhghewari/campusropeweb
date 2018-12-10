/*
 *
 * UserProfile reducer
 *
 */

import {
  DEFAULT_ACTION,
  PROFILE_TAB_SELECTION,
  SET_USER_PROFILE,
} from './constants';
import ProfileTabType from './components/ProfileTabTypeModel';

export const initialState = {
  selectedTab: ProfileTabType.typeTypeMap.POST_TAB,
  userProfileInfo: {},
};

function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfileInfo: action.userProfile,
      };
    case PROFILE_TAB_SELECTION:
      return {
        ...state,
        selectedTab: action.selectedTab,
      };
    default:
      return state;
  }
}

export default userProfileReducer;
