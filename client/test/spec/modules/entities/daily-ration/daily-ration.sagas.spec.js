import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import DailyRationSagas from '../../../../../app/modules/entities/daily-ration/daily-ration.sagas';
import DailyRationActions from '../../../../../app/modules/entities/daily-ration/daily-ration.reducer';

const { getDailyRation, getAllDailyRations, updateDailyRation, deleteDailyRation, searchDailyRations } = DailyRationSagas;
const stepper = fn => mock => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getDailyRation(1);
  const step = stepper(getDailyRation(FixtureAPI, { dailyRationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getDailyRation(FixtureAPI, { dailyRationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllDailyRations();
  const step = stepper(getAllDailyRations(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllDailyRations(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateDailyRation({ id: 1 });
  const step = stepper(updateDailyRation(FixtureAPI, { dailyRation: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateDailyRation(FixtureAPI, { dailyRation: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteDailyRation({ id: 1 });
  const step = stepper(deleteDailyRation(FixtureAPI, { dailyRationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteDailyRation(FixtureAPI, { dailyRationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DailyRationActions.dailyRationDeleteFailure()));
});
