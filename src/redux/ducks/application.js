// @flow

import { REHYDRATE } from 'redux-persist/constants';

//
// Typedefs
//

type State = {
  ready: boolean,
};

//
// Reducer
//

const INITIAL_STATE: State = {
  ready: false,
};

export default function(
  state: State = INITIAL_STATE,
  action: { type: typeof REHYDRATE }
): State {
  return action.type === REHYDRATE
    ? {
        ready: true,
      }
    : state;
}
