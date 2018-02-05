import axios from 'axios';
import { GET_NEWS, GET_NEWS_FAIL, GET_NEWS_SUCCESS } from './keys';

const API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;
const BASE_URL = process.env.REACT_APP_NYTIMES_API_ENDPOINT;

export function getNews(params = {}) {
  return (dispatch) => {
    dispatch({ type: GET_NEWS });
    return axios
      .get(`${BASE_URL}/articlesearch.json`, {
        params: {
          ...params,
          'api-key': API_KEY
        }
      })
      .then((response) => {
        dispatch({
          type: GET_NEWS_SUCCESS,
          payload: response.data,
          currentPage: params.page || 0
        });
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch({
          type: GET_NEWS_FAIL,
          payload: err
        });
        return Promise.reject(err);
      });
  };
}
