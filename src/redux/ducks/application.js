// @flow

export const APP_SET_USER_DATA = 'application/SET_USER_DATA';

//
// Typedefs
//
type State = {
  pushToken: ?string,
  userAccessToken: ?string,
  userProfile: ?Object,
};

//
// Actions
//
export type UserSetDataAction = {
  type: typeof APP_SET_USER_DATA,
  payload: $Shape<State>,
};

function setUserData(payload: $Shape<State>): UserSetDataAction {
  return {
    type: APP_SET_USER_DATA,
    payload,
  };
}

export function setPushToken(pushToken: string): UserSetDataAction {
  return setUserData({ pushToken });
}

export function setUserAccessToken(userAccessToken: string): UserSetDataAction {
  return setUserData({ userAccessToken });
}

export function setUserProfile(userProfile: Object): UserSetDataAction {
  return setUserData({ userProfile });
}

export function clearUserData(): UserSetDataAction {
  return setUserData(INITIAL_STATE);
}

//
// Reducer
//
const INITIAL_STATE: State = {
  pushToken: null,
  userAccessToken: null,
  userProfile: null,
};

export default function(
  state: State = INITIAL_STATE,
  action: UserSetDataAction
): State {
  switch (action.type) {
    case APP_SET_USER_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
