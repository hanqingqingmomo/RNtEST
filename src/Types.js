// @flow

import type { Reducers } from './redux/reducers';
import { colors } from './utils/color';

// Styling
export type ColorName = $Keys<typeof colors>;

export type Style =
  | {
      [key: string]: number | { [string]: string | number },
    }
  | Array<Style>;

// ScreenProps: props are passed to every "screen" component
export type ScreenProps<S> = {
  navigation: {
    navigate: Function,
    state: S,
  },
};

// Entities
export type User = $Exact<{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
}>;

// Redux
export type Action<T, A> = {
  type: T,
} & A;

export type ActionT<T> = Action<T, {}>;

export type ActionP<T, P> = Action<T, { payload: P }>;

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type Store = $ObjMap<Reducers, $ExtractFunctionReturn>;
