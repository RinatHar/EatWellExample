import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import DailyRationActions from './daily-ration.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getDailyRation(api, action) {
  const { dailyRationId } = action;
  // make the call to the api
  const apiCall = call(api.getDailyRation, dailyRationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(DailyRationActions.dailyRationSuccess(response.data));
  } else {
    yield put(DailyRationActions.dailyRationFailure(response.data));
  }
}

function* getAllDailyRations(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllDailyRations, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DailyRationActions.dailyRationAllSuccess(response.data, response.headers));
  } else {
    yield put(DailyRationActions.dailyRationAllFailure(response.data));
  }
}

function* updateDailyRation(api, action) {
  const { dailyRation } = action;
  // make the call to the api
  const idIsNotNull = !(dailyRation.id === null || dailyRation.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateDailyRation : api.createDailyRation, dailyRation);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(DailyRationActions.dailyRationUpdateSuccess(response.data));
  } else {
    yield put(DailyRationActions.dailyRationUpdateFailure(response.data));
  }
}

function* deleteDailyRation(api, action) {
  const { dailyRationId } = action;
  // make the call to the api
  const apiCall = call(api.deleteDailyRation, dailyRationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DailyRationActions.dailyRationDeleteSuccess());
  } else {
    yield put(DailyRationActions.dailyRationDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.createdDate = convertDateTimeFromServer(data.createdDate);
  data.lastModifiedDate = convertDateTimeFromServer(data.lastModifiedDate);
  return data;
}

export default {
  getAllDailyRations,
  getDailyRation,
  deleteDailyRation,
  updateDailyRation,
};
