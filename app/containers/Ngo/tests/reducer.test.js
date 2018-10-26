import ngoReducer from '../reducer';

describe('ngoReducer', () => {
  it('returns the initial state', () => {
    expect(ngoReducer(undefined, {})).toEqual({});
  });
});
