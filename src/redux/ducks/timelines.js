// @flow

import update from 'immutability-helper';

import { type ContentDestroyAction } from './contentObject';
import { normalize } from '../schemas';

export const TIMELINE_LOAD = 'timeline/load';
const TIMELINE_UPDATE_STATE = 'timeline/update-state';
const TIMELINE_SET_CONTENT = 'timeline/set-content';
const TIMELINE_UNSET_CONTENT = 'timeline/unset-content';

//
// Typedefs
//

export type Timeline = typeof INITIAL_SUBSTATE;

type PartialTimelineState = {
  content?: $PropertyType<Timeline, 'content'>,
  next?: $PropertyType<Timeline, 'content'>,
  loading?: $PropertyType<Timeline, 'loading'>,
  refreshing?: $PropertyType<Timeline, 'refreshing'>,
};

type State = {
  [string]: Timeline,
};

type TimelineSetContentAction = {
  type: typeof TIMELINE_SET_CONTENT,
  payload: {
    id: string,
    mergeMode: 'replace' | 'append' | 'prepend',
    result: $PropertyType<Timeline, 'content'>,
  },
};

type TimelineUnsetContentAction = {
  type: typeof TIMELINE_UNSET_CONTENT,
  payload: {
    id: string,
    result: Array<string>,
  },
};

export type TimelineLoadAction = {
  type: typeof TIMELINE_LOAD,
  payload: {
    id: string,
    path: string,
    mergeMode: 'replace' | 'append' | 'prepend',
    limit: number,
  },
};

export type TimelineSetStateAction = {
  type: typeof TIMELINE_UPDATE_STATE,
  payload: {
    id: string,
    state: PartialTimelineState,
  },
};

export function loadTimeline(
  payload: $PropertyType<TimelineLoadAction, 'payload'>
): TimelineLoadAction {
  return {
    type: TIMELINE_LOAD,
    payload,
  };
}

export function setTimelineContent(
  id: string,
  mergeMode: 'replace' | 'prepend' | 'append',
  content: Array<*>
): TimelineSetContentAction {
  const { entities, result } = normalize(content);
  return {
    type: TIMELINE_SET_CONTENT,
    payload: { id, mergeMode, result, entities },
  };
}

export function unsetTimelineContent(
  id: string,
  content: Array<*>
): TimelineUnsetContentAction {
  return {
    type: TIMELINE_UNSET_CONTENT,
    payload: { id, result: content },
  };
}

export function setTimelineState(
  id: string,
  state: PartialTimelineState
): TimelineSetStateAction {
  const nextState = { ...state };
  if (nextState.content) {
    nextState.content = normalize(nextState.content).result;
  }
  return {
    type: TIMELINE_UPDATE_STATE,
    payload: { id, state: nextState },
  };
}

//
// Reducer
//

const INITIAL_STATE: State = {};

const INITIAL_SUBSTATE: Timeline = {
  content: [],
  loading: false,
  next: null,
  refreshing: false,
};

export function reducer(
  state: State = INITIAL_STATE,
  action:
    | ContentDestroyAction
    | TimelineLoadAction
    | TimelineSetStateAction
    | TimelineSetContentAction
): State {
  switch (action.type) {
    case TIMELINE_SET_CONTENT: {
      const { id, mergeMode, result } = action.payload;
      let nextState = update(state, {
        [id]: { $apply: val => (val === undefined ? INITIAL_SUBSTATE : val) },
      });
      return update(nextState, {
        [id]: {
          content: {
            $apply: arr =>
              ({
                replace: c => result,
                append: c => c.concat(result),
                prepend: c => result.concat(c),
              }[mergeMode](arr)),
          },
        },
      });
    }

    case TIMELINE_UNSET_CONTENT: {
      const { id, result } = action.payload;
      let nextState = update(state, {
        [id]: { $apply: val => (val === undefined ? INITIAL_SUBSTATE : val) },
      });
      return update(nextState, {
        [id]: {
          content: {
            $apply: arr => arr.filter(id => result.includes(id) === false),
          },
        },
      });
    }

    case TIMELINE_UPDATE_STATE:
      return update(state, {
        [action.payload.id]: {
          $apply: val => (val === undefined ? INITIAL_SUBSTATE : val),
          $merge: action.payload.state,
        },
      });

    default:
      return state;
  }
}
