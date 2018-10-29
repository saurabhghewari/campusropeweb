import helplineReducer from '../reducer';

describe('helplineReducer', () => {
  it('returns the initial state', () => {
    expect(helplineReducer(undefined, {})).toEqual({});
  });
});
