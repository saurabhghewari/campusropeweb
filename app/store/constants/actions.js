import { SET_CONSTANTS, FETCH_CONSTANTS } from './constants';

export function setConstants(constants) {
  return {
    type: SET_CONSTANTS,
    constants,
  };
}

export function fetchConstants() {
  return {
    type: FETCH_CONSTANTS,
  };
}
