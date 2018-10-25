const _typeTypeMap = {
  ABOUT_TAB: 1,
  ACHIEVEMENTS_TAB: 2,
  FOLLOWERS_TAB: 3,
  FOLLOWING_TAB: 4,
};

export default class ProfileTabType {
  constructor() {}
  static get typeTypeMap() {
    return _typeTypeMap;
  }
}
