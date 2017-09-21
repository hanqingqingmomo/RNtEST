// @flow

import type { Reducers } from './redux/reducers';
import { colors } from './utils/color';
import {
  type IconSize as _IconSize,
  type IconName as _IconName,
} from './atoms/Icon/Utils';

export type IconName = _IconName;
export type IconSize = _IconSize;

// Styling
export type ColorName = $Keys<typeof colors>;

export type Style = any;
// | {
//     [key: string]: number | { [string]: string | number },
//   }
// | Array<Style>;

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
