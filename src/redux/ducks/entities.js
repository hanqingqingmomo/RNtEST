/**
 * Reducer only merges received entities by entity identity key.
 * Think of identity key as of entity name, e.g. `user`, or post.
 *
 * @flow
 */

import update from 'immutability-helper';

import { normalize, type Entity, type NormalizedPayload } from '../schemas';

export const ENTITY_DESTROY = 'entity/destroy';
export const ENTITY_MERGE = 'entity/merge';

type State = { sharedEntity: { [id: string]: Object } };

type DetroyEntityAction = {
  type: typeof ENTITY_DESTROY,
  payload: {
    entity: Entity,
  },
};

type MergeEntityAction = {
  type: typeof ENTITY_MERGE,
  payload: NormalizedPayload,
};

type Action = DetroyEntityAction | MergeEntityAction;

export function destroyEntity(entity: Entity): DetroyEntityAction {
  return {
    type: ENTITY_DESTROY,
    payload: { entity },
  };
}

export function mergeEntity(
  payload: Entity | Array<Entity>
): MergeEntityAction {
  return {
    type: ENTITY_MERGE,
    payload: normalize(payload),
  };
}

const INITIAL_STATE: State = {
  sharedEntity: {},
};

export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case ENTITY_DESTROY:
      return update(state, {
        sharedEntity: {
          $unset: [action.payload.entity.id],
        },
      });

    case ENTITY_MERGE:
      return update(state, {
        sharedEntity: {
          $merge: action.payload.entities,
        },
      });

    default:
      return state;
  }
}
