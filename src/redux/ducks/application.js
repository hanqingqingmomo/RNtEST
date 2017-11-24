// @flow

//
// Typedefs
//

type State = {
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

type ClearUserDataAction = {
  type: 'application/CLEAR_USER_DATA',
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

export function clearUserData(): ClearUserDataAction {
  return { type: 'application/CLEAR_USER_DATA' };
}

//
// Reducer
//

const INITIAL_STATE: State = {
  userAccessToken: null,
  userProfile: null,
};

export default function(
  state: State = INITIAL_STATE,
  action: SetUserAccessTokenAction | SetUserProfileAction | ClearUserDataAction
): State {
  switch (action.type) {
    case 'application/SET_USER_ACCESS_TOKEN':
      return {
        ...state,
        ...action.payload,
      };

    case 'application/CLEAR_USER_DATA':
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
}
