/*
 *
 * Ngo actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_NEW_NGO,
  SET_NGOS,
  FETCH_NGOS,
  SET_INVIEW_NGO,
  FETCH_NGO_BY_ID,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitNewNgo(values, actions) {
  return {
    type: SUBMIT_NEW_NGO,
    values,
    actions,
  };
}

export function fetchNgos() {
  return {
    type: FETCH_NGOS,
  };
}

export function fetchNgoById(ngoId) {
  return {
    type: FETCH_NGO_BY_ID,
    ngoId,
  };
}

export function setNgos(ngos) {
  return {
    type: SET_NGOS,
    ngos,
  };
}

export function setInViewNgo(ngo) {
  return {
    type: SET_INVIEW_NGO,
    ngo,
  };
}
