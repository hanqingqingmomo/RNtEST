// @flow

import reducer, {
  startRequest,
  endRequest,
  endRequestWithError,
  clearRequest,
  clearAllRequests,
} from './requests';
import { selectRequest } from '../selectors';

describe('Ducks: Request', () => {
  describe('Selector', () => {
    const REQ_ID = 'req:id';

    test('Should return null when request status is not available', () => {
      const state = {
        // $FlowExpectedError
        requests: reducer(undefined, { type: 'random' }),
      };

      expect(selectRequest(REQ_ID, state)).toBeNull();
    });

    test('Should return valid request', () => {
      const state = {
        requests: reducer(undefined, startRequest(REQ_ID)),
      };

      expect(selectRequest(REQ_ID, state)).toBeDefined();
    });
  });

  describe('Action Creators', () => {
    test('`startRequest` should create a valid action', () => {
      const action = startRequest('req:1');
      expect(action).toEqual({
        type: 'request/START',
        payload: { id: 'req:1' },
      });
    });

    test('`endRequest` should create a valid action', () => {
      const action = endRequest('req:1');
      expect(action).toEqual({
        type: 'request/END',
        payload: { id: 'req:1', error: null },
      });
    });

    test('`endRequestWithError` should create a valid action', () => {
      // $FlowExpectedError
      const action = endRequestWithError('req:1', 'error');
      expect(action).toEqual({
        type: 'request/END',
        payload: { id: 'req:1', error: 'error' },
      });
    });

    test('`clearRequest` should create a valid action', () => {
      const action = clearRequest('req:1');
      expect(action).toEqual({
        type: 'request/CLEAR',
        payload: { id: 'req:1' },
      });
    });

    test('`clearAllRequests` should create a valid action', () => {
      const action = clearAllRequests();
      expect(action).toEqual({
        type: 'request/CLEAR_ALL',
      });
    });
  });

  describe('Reducer', () => {
    let state = undefined;

    test('Should react to request start', () => {
      const action = startRequest('req:1');
      state = reducer(state, action);
      expect(state).toEqual({
        'req:1': {
          loading: true,
          error: null,
        },
      });
    });

    test('Should react to request end', () => {
      const action = endRequest('req:1');
      state = reducer(state, action);
      expect(state).toEqual({
        'req:1': {
          loading: false,
          error: null,
        },
      });
    });

    test('Should react to request end with error', () => {
      // $FlowExpectedError
      const action = endRequestWithError('req:1', 'error');
      state = reducer(state, action);
      expect(state).toEqual({
        'req:1': {
          loading: false,
          error: 'error',
        },
      });
    });

    test('Should react to request clearance', () => {
      const action = clearRequest('req:1');
      state = reducer(state, action);
      expect(state).toEqual({
        'req:1': undefined,
      });
    });

    test('Should react to clearance of all requests', () => {
      const action = clearAllRequests();
      state = reducer(state, action);
      expect(state).toEqual({});
    });
  });
});
