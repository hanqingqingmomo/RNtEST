// @flow

import { denormalize } from 'normalizr';

import { PostSchema } from './schemas';
import type { User, Store, RequestStatus, TimelineState } from '../Types';

//
// Request
//
export function selectRequest(
  requestId: string,
  state: Store
): RequestStatus | null {
  return state.requests[requestId] || null;
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

//
// Get timeline data
//
export const selectTimeline = (id: string) => (state: Store): TimelineState => {
  const substate = state.timeline[id] || null;
  return {
    next: null,
    loading: false,
    refreshing: false,
    ...substate,
    content: denormalize(
      substate ? substate.content : [],
      [PostSchema],
      state.entities
    ),
  };
};

export const selectEntity = (id: string) => (state: Store): Object =>
  state.entities.sharedEntity[id];

export function selectPost(id: string, state: Store): Object {
  const entity = selectEntity(id)(state);
  return denormalize(entity, PostSchema, state.entities);
}
