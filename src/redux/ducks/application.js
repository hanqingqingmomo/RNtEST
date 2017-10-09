// @flow

import { REHYDRATE } from 'redux-persist/lib/constants';

//
// Typedefs
//

type State = {
  ready: boolean,
  userAccessToken: ?string,
  userProfile: ?Object,
};

//
// Actions
//

type SetUserAccessTokenAction = {
  type: 'application/SET_USER_ACCESS_TOKEN',
  payload: {
    userAccessToken: string,
  },
};

type SetUserProfileAction = {
  type: 'application/SET_USER_ACCESS_TOKEN',
  payload: {
    userProfile: Object,
  },
};

export function setUserAccessToken(
  userAccessToken: string
): SetUserAccessTokenAction {
  return {
    type: 'application/SET_USER_ACCESS_TOKEN',
    payload: { userAccessToken },
  };
}

export function setUserProfile(userProfile: Object): SetUserProfileAction {
  return {
    type: 'application/SET_USER_ACCESS_TOKEN',
    payload: { userProfile },
  };
}

//
// Reducer
//

const INITIAL_STATE: State = {
  ready: false,
  userAccessToken: null,
  userProfile: null,
};

export default function(
  state: State = INITIAL_STATE,
  action:
    | { type: typeof REHYDRATE }
    | SetUserAccessTokenAction
    | SetUserProfileAction
): State {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.application;
    case 'application/SET_USER_ACCESS_TOKEN':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
