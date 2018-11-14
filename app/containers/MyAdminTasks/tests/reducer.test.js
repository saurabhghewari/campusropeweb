import myAdminTasksReducer from '../reducer';

describe('myAdminTasksReducer', () => {
  it('returns the initial state', () => {
    expect(myAdminTasksReducer(undefined, {})).toEqual({});
  });
});
