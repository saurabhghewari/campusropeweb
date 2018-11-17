import adminTaskReducer from '../reducer';

describe('adminTaskReducer', () => {
  it('returns the initial state', () => {
    expect(adminTaskReducer(undefined, {})).toEqual({});
  });
});
