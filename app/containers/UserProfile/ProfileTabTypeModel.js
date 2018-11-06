const _typeTypeMap = {
  ABOUT_TAB: 0,
  ACHIEVEMENTS_TAB: 1,
  FOLLOWERS_TAB: 2,
  FOLLOWING_TAB: 3,
  POST_TAB: 4,
};

export default class ProfileTabType {
  static get typeTypeMap() {
    return _typeTypeMap;
  }
}
