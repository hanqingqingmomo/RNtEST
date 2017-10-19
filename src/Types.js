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
  id: string,
  text_content: string,
  created_at: string,
  attachment: {} | null,
  author: {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    profile_photo: string,
  },
  comments_count: number,
  likes_count: number,
  replies: Array<Comment>,
}>;

// Entities
export type JoinedCommunity = {
  categories: Array<*>,
  cover_photo: string,
  description: string,
  id: number | string,
  members: number,
  name: string,
  nonprofit_id: number | string,
  profile_photo: string,
};

export type User = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  profile_photo: string,
  role: string,
  joined_communities: Array<JoinedCommunity>,
};

export type Attachment = {
  name: string,
  created_at: string,
  updated_at: ?string,
  type: 'pdf' | 'link' | string,
};

export type Community = {
  attachments: ?Array<Attachment>,
  cover_photo: string,
  description: ?string,
  id: number,
  joined: boolean,
  members: number,
  name: string,
  profile_photo: string,
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
