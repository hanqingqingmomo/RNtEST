// @flow

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
