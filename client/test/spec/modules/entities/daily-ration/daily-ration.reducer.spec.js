import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/daily-ration/daily-ration.reducer';

test('attempt retrieving a single dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.dailyRation).toEqual({ id: undefined });
});

test('attempt retrieving a list of dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.dailyRationList).toEqual([]);
});

test('attempt updating a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.dailyRation).toEqual({ id: 1 });
});

test('success retrieving a list of dailyRation', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.dailyRationAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.dailyRationList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.dailyRation).toEqual({ id: 1 });
});
test('success deleting a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.dailyRation).toEqual({ id: undefined });
});

test('failure retrieving a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.dailyRation).toEqual({ id: undefined });
});

test('failure retrieving a list of dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.dailyRationList).toEqual([]);
});

test('failure updating a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.dailyRation).toEqual(INITIAL_STATE.dailyRation);
});
test('failure deleting a dailyRation', () => {
  const state = reducer(INITIAL_STATE, Actions.dailyRationDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.dailyRation).toEqual(INITIAL_STATE.dailyRation);
});

test('resetting state for dailyRation', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.dailyRationReset());
  expect(state).toEqual(INITIAL_STATE);
});
