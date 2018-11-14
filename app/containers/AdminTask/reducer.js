/*
 *
 * AdminTask reducer
 *
 */

import {
  DEFAULT_ACTION,
  SET_ADMIN_TASKS,
  TOGGLE_ADMIN_TASK_SELECTION,
  FETCH_ADMIN_TASKS_OF_GIVEN_USER,
  CLEAR_TASKS,
} from './constants';

export const initialState = {
  tasks: [],
  selectedUser: '',
};

function adminTaskReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return state;
    }
    case SET_ADMIN_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
      };
    }
    case CLEAR_TASKS: {
      return {
        ...state,
        tasks: [],
      };
    }

    case FETCH_ADMIN_TASKS_OF_GIVEN_USER: {
      return {
        ...state,
        selectedUser: action.userId,
      };
    }
    case TOGGLE_ADMIN_TASK_SELECTION: {
      const indexOfListToUpdate = state.tasks.findIndex(
        task => task.id === action.taskId,
      );
      const updatesTaks = state.tasks.map((task, i) => {
        if (i === indexOfListToUpdate) {
          return {
            ...task,
            selected: !task.selected,
          };
        }
        return task;
      });
      return { ...state, tasks: updatesTaks };
    }
    default:
      return state;
  }
}

export default adminTaskReducer;
