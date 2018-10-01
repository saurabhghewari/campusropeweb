import { fromJS } from 'immutable';
import trendingNewsReducer from '../reducer';

describe('trendingNewsReducer', () => {
  it('returns the initial state', () => {
    expect(trendingNewsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
