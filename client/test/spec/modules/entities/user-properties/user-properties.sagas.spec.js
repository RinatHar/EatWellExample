import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import UserPropertiesSagas from '../../../../../app/modules/entities/user-properties/user-properties.sagas';
import UserPropertiesActions from '../../../../../app/modules/entities/user-properties/user-properties.reducer';

const { getUserProperties, getAllUserProperties, updateUserProperties, deleteUserProperties, searchUserProperties } = UserPropertiesSagas;
const stepper = fn => mock => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getUserProperties(1);
  const step = stepper(getUserProperties(FixtureAPI, { userPropertiesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getUserProperties(FixtureAPI, { userPropertiesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllUserProperties();
  const step = stepper(getAllUserProperties(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllUserProperties(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateUserProperties({ id: 1 });
  const step = stepper(updateUserProperties(FixtureAPI, { userProperties: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateUserProperties(FixtureAPI, { userProperties: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteUserProperties({ id: 1 });
  const step = stepper(deleteUserProperties(FixtureAPI, { userPropertiesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteUserProperties(FixtureAPI, { userPropertiesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserPropertiesActions.userPropertiesDeleteFailure()));
});
