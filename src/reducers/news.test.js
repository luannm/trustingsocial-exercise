import reducer, { INITIAL_STATE } from './news';
import { GET_NEWS, GET_NEWS_SUCCESS, GET_NEWS_FAIL } from '../actions/keys';

describe('news reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle GET_NEWS', () => {
    const action = {
      type: GET_NEWS
    };
    expect(reducer({}, action)).toEqual({
      error: null,
      isLoading: true
    });
  });

  it('should handle GET_NEWS_SUCCESS', () => {
    const action = {
      type: GET_NEWS_SUCCESS,
      payload: ['test'],
      currentPage: 1
    };
    expect(reducer({}, action)).toEqual({
      currentPage: 1,
      data: ['test'],
      error: null,
      isLoading: false
    });
  });

  it('should handle GET_NEWS_FAIL', () => {
    const action = {
      type: GET_NEWS_FAIL,
      payload: 'Test'
    };
    expect(reducer({}, action)).toEqual({
      data: null,
      error: 'Test',
      isLoading: false
    });
  });
});
