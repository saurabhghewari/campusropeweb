import { ADMIN_TASK_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

/*eslint-disable*/
export function getAdminTasksForUser(userId) {
  if (userId) {
    const URL_WITH_QUERY = `${ADMIN_TASK_URL}/user/${userId}`;
    return getAxiosInstance()
      .get(URL_WITH_QUERY)
      .then(res => res.data.tasks);
  } // this is called on auto complete . the above if condition is to avoid unwanted network requests
}
