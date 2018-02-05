import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import axios from 'axios';
import { getNews } from './news';
import { GET_NEWS, GET_NEWS_FAIL, GET_NEWS_SUCCESS } from './keys';

const mockStore = configureMockStore([thunk]);

describe('News Actions', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('getNews action', () => {
    it('should dispatch correct if API called success', (done) => {
      const store = mockStore({});
      const EXPECTED_ACTIONS = [
        {
          type: GET_NEWS
        },
        {
          type: GET_NEWS_SUCCESS,
          payload: { test: 'abc' },
          currentPage: 0
        }
      ];
      sandbox
        .stub(axios, 'get')
        .returns(new Promise((resolve, reject) => resolve({ data: [] })));
      store
        .dispatch(getNews())
        .then(() => {
          expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should dispatch correct if API called failed', (done) => {
      const store = mockStore({});
      const EXPECTED_ACTIONS = [
        {
          type: GET_NEWS
        },
        {
          type: GET_NEWS_FAIL,
          payload: new Error('Fake Error')
        }
      ];
      sandbox
        .stub(axios, 'get')
        .returns(new Promise((resolve, reject) => reject(new Error('Fake Error'))));
      store.dispatch(getNews()).catch((err) => {
        expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
        done();
      });
    });
  });
});
