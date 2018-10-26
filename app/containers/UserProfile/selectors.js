import { createSelector } from 'reselect';

/**
 * Direct selector to the userProfile state domain
 */

const selectUserProfileDomain = state => state.userProfile;

/**
 * Other specific selectors
 */

// selects user profile info(userProfileEntity)
const selectUserProfileInfo = () =>
  createSelector(
    selectUserProfileDomain,
    profile => profile.userProfileInfo && profile.userProfileInfo,
  );

// selects user details(userEntity)
/* const selectUserInfo = () =>
  createSelector(
    selectUserProfileInfo,
    userProfile => userProfile.createdBy && userProfile.createdBy,
  ); */

const makeSelectSelectedTab = () =>
  createSelector(
    makeSelectUserProfile(),
    userProfile => userProfile.selectedTab,
  );
/**
 * Default selector used by UserProfile
 */

const makeSelectUserProfile = () =>
  createSelector(selectUserProfileDomain, substate => substate);

export default makeSelectUserProfile;
export {
  selectUserProfileDomain,
  makeSelectSelectedTab,
  selectUserProfileInfo,
};
