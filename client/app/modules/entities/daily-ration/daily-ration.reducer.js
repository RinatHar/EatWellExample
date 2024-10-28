import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dailyRationRequest: ['dailyRationId'],
  dailyRationAllRequest: ['options'],
  dailyRationUpdateRequest: ['dailyRation'],
  dailyRationDeleteRequest: ['dailyRationId'],

  dailyRationSuccess: ['dailyRation'],
  dailyRationAllSuccess: ['dailyRationList', 'headers'],
  dailyRationUpdateSuccess: ['dailyRation'],
  dailyRationDeleteSuccess: [],

  dailyRationFailure: ['error'],
  dailyRationAllFailure: ['error'],
  dailyRationUpdateFailure: ['error'],
  dailyRationDeleteFailure: ['error'],

  dailyRationReset: [],
});

export const DailyRationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  dailyRation: { id: undefined },
  dailyRationList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    dailyRation: INITIAL_STATE.dailyRation,
  });

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = state =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = state =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { dailyRation } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    dailyRation,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { dailyRationList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    dailyRationList: loadMoreDataWhenScrolled(state.dailyRationList, dailyRationList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { dailyRation } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    dailyRation,
  });
};
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    dailyRation: INITIAL_STATE.dailyRation,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    dailyRation: INITIAL_STATE.dailyRation,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    dailyRationList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    dailyRation: state.dailyRation,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    dailyRation: state.dailyRation,
  });
};

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DAILY_RATION_REQUEST]: request,
  [Types.DAILY_RATION_ALL_REQUEST]: allRequest,
  [Types.DAILY_RATION_UPDATE_REQUEST]: updateRequest,
  [Types.DAILY_RATION_DELETE_REQUEST]: deleteRequest,

  [Types.DAILY_RATION_SUCCESS]: success,
  [Types.DAILY_RATION_ALL_SUCCESS]: allSuccess,
  [Types.DAILY_RATION_UPDATE_SUCCESS]: updateSuccess,
  [Types.DAILY_RATION_DELETE_SUCCESS]: deleteSuccess,

  [Types.DAILY_RATION_FAILURE]: failure,
  [Types.DAILY_RATION_ALL_FAILURE]: allFailure,
  [Types.DAILY_RATION_UPDATE_FAILURE]: updateFailure,
  [Types.DAILY_RATION_DELETE_FAILURE]: deleteFailure,
  [Types.DAILY_RATION_RESET]: reset,
});
