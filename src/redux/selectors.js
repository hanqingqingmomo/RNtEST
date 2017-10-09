// @flow

import type { User, Store } from '../Types';

//
// Generic app wide selectors
//

export function selectApplicationIsReady(state: Store): boolean {
  return state.application.ready;
}

//
// Authenticated user
//

export function selectAccessToken(state: Store): ?string {
  return state.application.userAccessToken;
}

export function selectUser(state: Store): ?User {
  return state.application.userProfile;
}
