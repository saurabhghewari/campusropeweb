import { USER_PROFILE_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export function getUserProfile(userId) {
  const URL_WITH_QUERY = `${USER_PROFILE_URL}?profileOf=${userId}&limit=1`;
  return getAxiosInstance()
    .get(URL_WITH_QUERY)
    .then(res => (res.data instanceof Array ? res.data[0] : res.data));
}

export function saveUserProfile(payload) {
  const { profileOf } = payload;
  const URL_WITH_QUERY = `${USER_PROFILE_URL}/${payload.profileId}`;
  return getAxiosInstance()
    .put(URL_WITH_QUERY, { ...payload, profileOf: profileOf.id })
    .then(res => res.data);
}
