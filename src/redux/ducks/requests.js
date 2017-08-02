// @flow

import update from 'immutability-helper';

import type { Action, ActionP, ActionT } from '../../Types';

export const REQUEST_IDS = {
  VERIFY_CREDENTIALS: 'VERIFY_CREDENTIALS',
};

//
// Typedefs
//

type InternalAxiosRequest = Object;

type InternalAxiosConfig = Object;

export type RequestID = $Keys<typeof REQUEST_IDS>;

export type RequestError = {
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

export type RequestProps = {
  clearRequest: RequestID => ClearRequestAction,
  requestIsRunning: boolean,
  requestError: ?RequestError,
};

type State = {
  running: Array<RequestID>,
  errors: {
    [string]: ?RequestError,
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
    error: ?RequestError,
    payload: {
      id: RequestID,
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
    error: null,
  };
}

export function endRequest(requestId: RequestID): RequestEndedAction {
  return {
    type: 'request/END',
    error: null,
    payload: {
      id: requestId,
    },
  };
}

export function endRequestWithError(
  requestId: RequestID,
  requestError: RequestError
): RequestEndedAction {
  return {
    type: 'request/END',
    error: requestError,
    payload: {
      id: requestId,
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

const INITIAL_STATE: State = {
  running: [],
  errors: {},
};

export default function(
  state: State = INITIAL_STATE,
  action: RequestStartedAction | RequestEndedAction
): State {
  switch (action.type) {
    case 'request/START':
      return update(state, {
        errors: {
          $unset: [action.payload.id],
        },
        running: {
          $push: [action.payload.id],
        },
      });

    case 'request/END':
      return {
        errors: update(state.errors, {
          [action.payload.id]: { $set: action.error },
        }),
        running: state.running.filter(id => id !== action.payload.id),
      };

    case 'request/CLEAR':
      return {
        errors: update(state.errors, { $unset: [action.payload.id] }),
        running: state.running.filter(id => id !== action.payload.id),
      };

    case 'request/CLEAR_ALL':
      return {
        errors: {},
        running: [],
      };

    default:
      return state;
  }
}
