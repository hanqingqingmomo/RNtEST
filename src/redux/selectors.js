// @flow

import type { User, Store } from '../Types';

// Application
export function selectApplicationIsReady(state: Store): boolean {
  return state.application.ready;
}

// Authenticated user
export function selectAccessToken(state: Store): ?string {
  return state.user.accessToken;
}

export function selectUser(state: Store): ?User {
  return state.user.profile;
}
