// @flow

import { call, put, takeLatest } from 'redux-saga/effects';

import { API } from '../../services';
import type { ActionT, ActionP, User } from '../../Types';

//
// Typedefs
//
type AccessToken = string;

type Profile = User;

type State = {
  accessToken: ?AccessToken,
  profile: ?Profile,
};

type AuthenticateAction = ActionP<
  'app/AUTHENTICATE',
  {
    accessToken: AccessToken,
    profile: Profile,
  }
>;

type InvalidateSessionAction = ActionT<'app/INVALIDATE_SESSION'>;

type VerifyCredentialsAction = ActionP<
  'app/VERIFY_CREDENTIALS',
  {
    email: string,
    password: string,
  }
>;

//
// Action creators
//
export function verifyCredentials(
  email: string,
  password: string
): VerifyCredentialsAction {
  return {
    type: 'app/VERIFY_CREDENTIALS',
    payload: {
      email,
      password,
    },
  };
}

export function authenticate(
  profile: Profile,
  accessToken: AccessToken
): AuthenticateAction {
  return {
    type: 'app/AUTHENTICATE',
    payload: {
      profile,
      accessToken,
    },
  };
}

export function invalidateSession(): InvalidateSessionAction {
  return {
    type: 'app/INVALIDATE_SESSION',
  };
}

//
// Saga
//
const workerVerifyCredentials = function*(action: VerifyCredentialsAction) {
  try {
    const accessToken = yield call(
      API.authentication.verifyCredentials,
      action.payload.email,
      action.payload.password
    );

    const profile = yield call(API.authentication.getProfile, accessToken);

    yield put(authenticate(profile, accessToken));
  } catch (error) {
    // @TODO dispatch request error action
  }
};

export const saga = function*(): Generator<*, *, *> {
  yield takeLatest('app/VERIFY_CREDENTIALS', workerVerifyCredentials);
};

//
// Reducer
//
const INITIAL_STATE: State = {
  profile: null,
  accessToken: null,
};

export default function(
  state: State = INITIAL_STATE,
  action: AuthenticateAction | InvalidateSessionAction
): State {
  switch (action.type) {
    case 'app/AUTHENTICATE':
      return {
        accessToken: action.payload.accessToken,
        profile: action.payload.profile,
      };

    case 'app/INVALIDATE_SESSION':
      return INITIAL_STATE;

    default:
      return state;
  }
}
