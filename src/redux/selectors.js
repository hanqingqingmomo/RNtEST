// @flow

import { type RequestID, type RequestError } from './ducks/requests';
import type { User, Store } from '../Types';

//
// Generic app wide selectors
//

export function selectApplicationIsReady(state: Store): boolean {
  return state.application.ready;
}

export function selectIsRequestRunning(
  state: Store,
  requestId: RequestID
): boolean {
  return state.requests.running.indexOf(requestId) > -1;
}

export function selectRequestError(
  state: Store,
  requestId: RequestID
): ?RequestError {
  return state.requests.errors[requestId] || null;
}

//
// Authenticated user
//

export function selectAccessToken(state: Store): ?string {
  return state.user.accessToken;
}

export function selectUser(state: Store): ?User {
  return state.user.profile;
}
