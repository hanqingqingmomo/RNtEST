// @flow

export const APP_SET_USER_DATA = 'application/SET_USER_DATA';
export const APP_START_SESSION = 'application/START_SESSION';
export const APP_END_SESSION = 'application/END_SESSION';

//
// Typedefs
//
type State = {
  +isAuthenticated: boolean,
  +userAccessToken: ?string,
  +userProfile: ?Object,
  +provider: ?string,
};

//
// Actions
//
export type UserSetDataAction = {
  type: typeof APP_SET_USER_DATA,
  payload: $Shape<State>,
};

type Action =
  | $Call<typeof startSession>
  | $Call<typeof endSession>
  | UserSetDataAction;

export function startSession() {
  return { type: APP_START_SESSION };
}

export function endSession() {
  return { type: APP_END_SESSION };
}

function setUserData(payload: $Shape<State>): UserSetDataAction {
  return {
    type: APP_SET_USER_DATA,
    payload,
  };
}

export function setUserAccessToken(userAccessToken: string): UserSetDataAction {
  return setUserData({ userAccessToken });
}

export function setUserProfile(userProfile: Object): UserSetDataAction {
  return setUserData({ userProfile });
}

export function setProvider(provider: string): UserSetDataAction {
  return setUserData({ provider });
}

//
// Selectors
//
export function getProvider(state: { application: State }) {
  return state.application.provider;
}

//
// Reducer
//
const INITIAL_STATE: State = {
  isAuthenticated: false,
  userAccessToken: null,
  userProfile: null,
  provider: null,
};

export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case APP_SET_USER_DATA:
      return { ...state, ...action.payload };

    case APP_START_SESSION:
      return { ...state, isAuthenticated: true };

    case APP_END_SESSION:
      return INITIAL_STATE;

    default:
      return state;
  }
}
