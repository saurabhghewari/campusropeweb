/*
 *
 * AdminTask reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_ADMIN_TASKS,
  TOGGLE_ADMIN_TASK_SELECTION,
  FETCH_ADMIN_TASKS_OF_GIVEN_USER,
} from './constants';

export const initialState = fromJS({
  tasks: [],
  selectedUser: '',
});

function adminTaskReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return state;
    }
    case SET_ADMIN_TASKS: {
      return state.set('tasks', fromJS(action.tasks));
    }

    case FETCH_ADMIN_TASKS_OF_GIVEN_USER: {
      return state.set('selectedUser', action.userId);
    }
    case TOGGLE_ADMIN_TASK_SELECTION: {
      const indexOfListToUpdate = state
        .get('tasks')
        .findIndex(task => task.get('id') === action.taskId);
      const bool = state.getIn(['tasks', indexOfListToUpdate, 'selected']);
      return state.setIn(['tasks', indexOfListToUpdate, 'selected'], !bool);
    }
    default:
      return state;
  }
}

export default adminTaskReducer;
