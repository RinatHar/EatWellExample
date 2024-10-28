import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userPropertiesRequest: ['userPropertiesId'],
  userPropertiesAllRequest: ['options'],
  userPropertiesUpdateRequest: ['userProperties'],
  userPropertiesDeleteRequest: ['userPropertiesId'],

  userPropertiesSuccess: ['userProperties'],
  userPropertiesAllSuccess: ['userPropertiesList', 'headers'],
  userPropertiesUpdateSuccess: ['userProperties'],
  userPropertiesDeleteSuccess: [],

  userPropertiesFailure: ['error'],
  userPropertiesAllFailure: ['error'],
  userPropertiesUpdateFailure: ['error'],
  userPropertiesDeleteFailure: ['error'],

  userPropertiesReset: [],
});

export const UserPropertiesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  userProperties: { id: undefined },
  userPropertiesList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    userProperties: INITIAL_STATE.userProperties,
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
  const { userProperties } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    userProperties,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { userPropertiesList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    userPropertiesList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { userProperties } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    userProperties,
  });
};
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    userProperties: INITIAL_STATE.userProperties,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    userProperties: INITIAL_STATE.userProperties,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    userPropertiesList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    userProperties: state.userProperties,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    userProperties: state.userProperties,
  });
};

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_PROPERTIES_REQUEST]: request,
  [Types.USER_PROPERTIES_ALL_REQUEST]: allRequest,
  [Types.USER_PROPERTIES_UPDATE_REQUEST]: updateRequest,
  [Types.USER_PROPERTIES_DELETE_REQUEST]: deleteRequest,

  [Types.USER_PROPERTIES_SUCCESS]: success,
  [Types.USER_PROPERTIES_ALL_SUCCESS]: allSuccess,
  [Types.USER_PROPERTIES_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_PROPERTIES_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_PROPERTIES_FAILURE]: failure,
  [Types.USER_PROPERTIES_ALL_FAILURE]: allFailure,
  [Types.USER_PROPERTIES_UPDATE_FAILURE]: updateFailure,
  [Types.USER_PROPERTIES_DELETE_FAILURE]: deleteFailure,
  [Types.USER_PROPERTIES_RESET]: reset,
});
