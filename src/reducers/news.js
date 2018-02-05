import { GET_NEWS, GET_NEWS_SUCCESS, GET_NEWS_FAIL } from '../actions/keys';

export const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null,
  currentPage: 0
};

export default function(state = INITIAL_STATE, action) {
  const { payload, currentPage } = action;
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
        error: null,
        currentPage
      };
    case GET_NEWS_FAIL:
      return {
        ...state,
        data: null,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
