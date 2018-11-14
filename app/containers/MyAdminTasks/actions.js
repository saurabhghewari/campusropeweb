/*
 *
 * MyAdminTasks actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_MY_ADMIN_TASKS,
  SET_MY_ADMIN_TASKS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchMyAdminTasks() {
  return {
    type: FETCH_MY_ADMIN_TASKS,
  };
}

export function setMyAdminTasks(tasks) {
  return {
    type: SET_MY_ADMIN_TASKS,
    tasks,
  };
}
