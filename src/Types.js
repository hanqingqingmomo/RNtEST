// @flow

import type { Reducers } from './redux/reducers';

// ScreenProps: props are passed to every "screen" component

export type ScreenProps<S> = {
  navigation: {
    navigate: Function,
    state: S,
  },
};

//
// Entities
//

export type User = $Exact<{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
}>;

//
// Redux
//

// Generic Actions

export type Action<T, A> = {
  type: T,
} & A;

export type ActionT<T> = Action<T, {}>;

export type ActionP<T, P> = Action<T, { payload: P }>;

// Store shape

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type Store = $ObjMap<Reducers, $ExtractFunctionReturn>;
