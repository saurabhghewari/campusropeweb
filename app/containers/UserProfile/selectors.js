import { createSelector } from 'reselect';

const selectUserProfileDomain = state => state.userProfile;

const makeSelectUserProfileInfo = () =>
  createSelector(
    selectUserProfileDomain,
    profile => profile.userProfileInfo && profile.userProfileInfo,
  );

const makeSelectSelectedTab = () =>
  createSelector(selectUserProfileDomain, state => state.selectedTab);
/**
 * Default selector used by UserProfile
 */

export default makeSelectUserProfileInfo;
export {
  selectUserProfileDomain,
  makeSelectSelectedTab,
  makeSelectUserProfileInfo,
};
