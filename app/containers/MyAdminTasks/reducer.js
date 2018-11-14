/*
 *
 * MyAdminTasks reducer
 *
 */

import { DEFAULT_ACTION, SET_MY_ADMIN_TASKS } from './constants';

export const initialState = [];

function myAdminTasksReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_MY_ADMIN_TASKS:
      return action.tasks.filter(task => task.selected);
    default:
      return state;
  }
}

export default myAdminTasksReducer;
