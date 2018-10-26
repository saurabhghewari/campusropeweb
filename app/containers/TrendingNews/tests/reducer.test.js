import trendingNewsReducer from '../reducer';

describe('trendingNewsReducer', () => {
  it('returns the initial state', () => {
    expect(trendingNewsReducer(undefined, {})).toEqual({});
  });
});
