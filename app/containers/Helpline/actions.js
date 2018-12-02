/*
 *
 * Helpline actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_HELPLINES,
  FETCH_HELPLINE_BY_ID,
  SET_VIEW_HELPLINE,
  CREATE_HELPLINE,
  SET_HELPLINES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchHelplines(state='all') {
  return {
    type: FETCH_HELPLINES,
    state
  };
}
export function setHelplines(helplines) {
  return {
    type: SET_HELPLINES,
    helplines,
  };
}

export function fetchHelplineById(helplineId) {
  return {
    type: FETCH_HELPLINE_BY_ID,
    helplineId,
  };
}

export function createHelpline(values, actions ) {
  return {
    type: CREATE_HELPLINE,
    values,
    actions,
  };
}

export function setInViewHelpline(helpline) {
  return {
    type: SET_VIEW_HELPLINE,
    helpline,
  };
}
