import supportReducer from '../reducer';

describe('supportReducer', () => {
  it('returns the initial state', () => {
    expect(supportReducer(undefined, {})).toEqual({});
  });
});
