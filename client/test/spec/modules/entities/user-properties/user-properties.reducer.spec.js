import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/user-properties/user-properties.reducer';

test('attempt retrieving a single userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.userProperties).toEqual({ id: undefined });
});

test('attempt retrieving a list of userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.userPropertiesList).toEqual([]);
});

test('attempt updating a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.userProperties).toEqual({ id: 1 });
});

test('success retrieving a list of userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.userPropertiesList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.userProperties).toEqual({ id: 1 });
});
test('success deleting a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.userProperties).toEqual({ id: undefined });
});

test('failure retrieving a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.userProperties).toEqual({ id: undefined });
});

test('failure retrieving a list of userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.userPropertiesList).toEqual([]);
});

test('failure updating a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.userProperties).toEqual(INITIAL_STATE.userProperties);
});
test('failure deleting a userProperties', () => {
  const state = reducer(INITIAL_STATE, Actions.userPropertiesDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.userProperties).toEqual(INITIAL_STATE.userProperties);
});

test('resetting state for userProperties', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.userPropertiesReset());
  expect(state).toEqual(INITIAL_STATE);
});
