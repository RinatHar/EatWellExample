import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import UserPropertiesActions from './user-properties.reducer';
import { convertDateTimeFromServer, convertLocalDateFromServer } from '../../../shared/util/date-transforms';

function* getUserProperties(api, action) {
  const { userPropertiesId } = action;
  // make the call to the api
  const apiCall = call(api.getUserProperties, userPropertiesId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(UserPropertiesActions.userPropertiesSuccess(response.data));
  } else {
    yield put(UserPropertiesActions.userPropertiesFailure(response.data));
  }
}

function* getAllUserProperties(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllUserProperties, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(UserPropertiesActions.userPropertiesAllSuccess(response.data, response.headers));
  } else {
    yield put(UserPropertiesActions.userPropertiesAllFailure(response.data));
  }
}

function* updateUserProperties(api, action) {
  const { userProperties } = action;
  // make the call to the api
  const idIsNotNull = !(userProperties.id === null || userProperties.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateUserProperties : api.createUserProperties, userProperties);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(UserPropertiesActions.userPropertiesUpdateSuccess(response.data));
  } else {
    yield put(UserPropertiesActions.userPropertiesUpdateFailure(response.data));
  }
}

function* deleteUserProperties(api, action) {
  const { userPropertiesId } = action;
  // make the call to the api
  const apiCall = call(api.deleteUserProperties, userPropertiesId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(UserPropertiesActions.userPropertiesDeleteSuccess());
  } else {
    yield put(UserPropertiesActions.userPropertiesDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.date = convertLocalDateFromServer(data.date);
  data.createdDate = convertDateTimeFromServer(data.createdDate);
  data.lastModifiedDate = convertDateTimeFromServer(data.lastModifiedDate);
  return data;
}

export default {
  getAllUserProperties,
  getUserProperties,
  deleteUserProperties,
  updateUserProperties,
};
