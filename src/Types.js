// @flow

import type { Reducers } from './redux/reducers';
import {
  type IconSize as _IconSize,
  type IconName as _IconName,
} from './atoms/Icon/Utils';

import { type ColorName as _ColorName } from './utils/color';

export type IconName = _IconName;
export type IconSize = _IconSize;

export type ColorName = _ColorName;

export type Style = number | boolean | Object | Array<?Style>;

// ScreenProps: props are passed to every "screen" component
export type ScreenProps<S> = {
  navigation: {
    navigate: Function,
    state: S,
  },
};

export type Comment = $Exact<{
  id: number,
  parentId?: number,
  timestamp: number,
  content: string,
  replies: Array<Comment>,
  author: {
    id: number,
    name: string,
    avatar: string,
  },
}>;

// Entities
export type User = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  profilePhoto: string,
  role: string,
};

export type Attachment = {
  name: string,
  created_at: string,
  updated_at: ?string,
  type: 'pdf' | string,
};

export type Community = {
  id: number,
  name: string,
  profile_photo: string,
  cover_photo: string,
  members: number,
  description: ?string,
  attachments: ?Array<Attachment>,
  joined: boolean,
};

export type CommunityMember = {
  id: number,
  first_name: string,
  last_name: string,
  profile_photo: string,
  email: string,
  joined_communities: Array<Community>,
};

// Redux
export type Action<T, A> = {
  type: T,
} & A;

export type ActionT<T> = Action<T, {}>;

export type ActionP<T, P> = Action<T, { payload: P }>;

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type Store = $ObjMap<Reducers, $ExtractFunctionReturn>;
