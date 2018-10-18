/*
 *
 * UserProfile reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, PROFILE_TAB_SELECTION_ACTION } from './constants';
import ProfileTabType from './ProfileTabTypeModel';

export const initialState = fromJS({
  selectedTab: ProfileTabType.typeTypeMap.ABOUT_TAB,
});

function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PROFILE_TAB_SELECTION_ACTION:
      return state.set('selectedTab', action.selectedTab);
    default:
      return state;
  }
}

export default userProfileReducer;
