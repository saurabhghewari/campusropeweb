import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProfile state domain
 */

const selectUserProfileDomain = state => state.get('userProfile', initialState);

/**
 * Other specific selectors
 */

// selects user profile info(userProfileEntity)
const selectUserProfileInfo = () =>
  createSelector(selectUserProfileDomain, 
    (profile) => {
      return profile.userProfileInfo && profile.userProfileInfo.toJS()
    })

// selects user details(userEntity)
const selectUserInfo = () =>
  createSelector(selectUserProfileInfo, 
    (userProfile) => userProfile.createdBy && userProfile.createdBy.toJS())

const makeSelectSelectedTab = () =>
  createSelector(makeSelectUserProfile(), (userProfile) => userProfile.selectedTab)
/**
 * Default selector used by UserProfile
 */

const makeSelectUserProfile = () =>
  createSelector(selectUserProfileDomain, substate => substate.toJS());

export default makeSelectUserProfile;
export { selectUserProfileDomain, makeSelectSelectedTab, selectUserProfileInfo };
