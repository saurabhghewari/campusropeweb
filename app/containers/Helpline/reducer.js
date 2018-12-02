/*
 *
 * Helpline reducer
 *
 */

import { DEFAULT_ACTION,SET_HELPLINES,SET_VIEW_HELPLINE } from './constants';

export const initialState = {
  helplineList: [],
  selectedHelpline: {},
};

function helplineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_HELPLINES:
      return {
        ...state,
        helplineList: action.helplines,
      };
    case SET_VIEW_HELPLINE:
      return {
        ...state,
        selectedHelpline: action.helpline,
      };
    default:
      return state;
  }
}

export default helplineReducer;

