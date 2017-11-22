// @flow

import update from 'immutability-helper';

import type { Action, ActionP, ActionT } from '../../Types';

//
// Typedefs
//

type InternalAxiosRequest = Object;

type InternalAxiosConfig = Object;

type RequestID = string;

type RequestError = {
  httpError: boolean,
  config: InternalAxiosConfig,
  request: InternalAxiosRequest,
  response: {
    config: InternalAxiosConfig,
    data: Object,
    headers: Object,
    request: InternalAxiosRequest,
    status: number,
    statusText?: string,
  },
};

type State = {
  [id: string]: {
    loading: boolean,
    error: ?mixed,
  },
};

type RequestStartedAction = ActionP<
  'request/START',
  {
    id: RequestID,
  }
>;

type RequestEndedAction = Action<
  'request/END',
  {
    payload: {
      id: RequestID,
      error: ?RequestError,
    },
  }
>;

type ClearRequestAction = ActionP<
  'request/CLEAR',
  {
    id: RequestID,
  }
>;

type ClearAllRequestsAction = ActionT<'request/CLEAR_ALL'>;

//
// Action creators
//
export function startRequest(requestId: RequestID): RequestStartedAction {
  return {
    type: 'request/START',
    payload: {
      id: requestId,
    },
  };
}

export function endRequest(requestId: RequestID): RequestEndedAction {
  return {
    type: 'request/END',
    payload: {
      id: requestId,
      error: null,
    },
  };
}

export function endRequestWithError(
  requestId: RequestID,
  requestError: RequestError
): RequestEndedAction {
  return {
    type: 'request/END',
    payload: {
      id: requestId,
      error: requestError,
    },
  };
}

export function clearRequest(requestId: RequestID): ClearRequestAction {
  return {
    type: 'request/CLEAR',
    payload: {
      id: requestId,
    },
  };
}

export function clearAllRequests(): ClearAllRequestsAction {
  return {
    type: 'request/CLEAR_ALL',
  };
}

//
// Reducer
//

const INITIAL_STATE: State = {};

export default function(
  state: State = INITIAL_STATE,
  action:
    | ClearAllRequestsAction
    | ClearRequestAction
    | RequestEndedAction
    | RequestStartedAction
): State {
  switch (action.type) {
    case 'request/START':
      return update(state, {
        [action.payload.id]: { $set: { loading: true, error: null } },
      });

    case 'request/END':
      return update(state, {
        [action.payload.id]: {
          $set: { loading: false, error: action.payload.error },
        },
      });

    case 'request/CLEAR':
      return update(state, {
        [action.payload.id]: {
          $set: undefined,
        },
      });

    case 'request/CLEAR_ALL':
      return {};

    default:
      return state;
  }
}
