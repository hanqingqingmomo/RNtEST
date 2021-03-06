// @flow
/* eslint-disable no-use-before-define */

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
export type LocalImage = {
  fileName: string,
  fileSize: number,
  isVertical: boolean,
  origURL: string,
  timestamp: string,
  uri: string,
  width: number,
  height: number,
  error: Object,
  didCancel: boolean,
};

export type ScreenProps<S> = {
  navigation: {
    goBack: Function,
    navigate: Function,
    state: S,
  },
};

export type FetchProps<D> = {
  data: D,
  error?: Object,
  fetch: Function,
  loading: ?boolean,
};

export type LinkAttachment = {
  url: string,
  thumbnail_url: ?string,
  title: ?string,
  description: ?string,
};

export type RSVPStatuses = 'going' | 'pending' | 'not_going';

export type CommunitySimple = {
  auto_join: boolean,
  categories: Array<*>,
  cover_photo: string,
  description: string,
  disabled: boolean,
  id: string,
  members: number,
  name: string,
  nonprofit_id: string,
  profile_photo: string,
};

export type User = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  profile_photo: string,
  role?: string,
  joined_communities: Array<CommunitySimple>,
};

export type ContactEmailDetail = {
  email: string,
  label: string,
};

export type ContactPhoneDetail = {
  label: string,
  number: string,
};

export type ContactAddress = {
  city: string,
  country: string,
  label: string,
  postCode: string,
  region: string,
  state: string,
  street: string,
};

export type Contact = {
  company: string,
  emailAddresses: Array<ContactEmailDetail>,
  phoneNumbers: Array<ContactPhoneDetail>,
  familyName: string,
  givenName: string,
  hasThumbnail: boolean,
  jobTitle: string,
  middleName: string,
  recordID: string,
  thumbnailPath: string,
  postalAddresses: Array<ContactAddress>,
};

export type Comment = $Exact<{
  id: string,
  text_content: string,
  created_at: string,
  attachment: {} | null,
  author: User,
  comments_count: number,
  likes_count: number,
  liked: boolean,
  replies: Array<Comment>,
}>;

export type Post = {
  id: string,
  text_content: string,
  attachment: ?{
    type: string,
    url: string,
  },
  type: 'post' | 'event',
  author: User,
  cached_url: ?LinkAttachment,
  comments_count: number,
  communities: Array<CommunitySimple>,
  created_at: string,
  likes_count: number,
  liked: boolean,
  donation: {}, // todo
  event: {
    cover_photo: string,
    end: Date,
    start: Date,
    title: string,
  },
  replies: Array<Comment>,
};

// Entities

export type Community = CommunitySimple & {
  joined: boolean,
  administrators: Array<User>,
};

export type CommunityMember = {
  id: string,
  first_name: string,
  last_name: string,
  profile_photo: string,
  email: string,
  joined_communities: Array<Community>,
};

export type PopupAction = $Exact<{
  key: string,
  iconName: IconName,
  label: string,
  onPress: Function,
}>;

// Redux
export type Action<T, A> = {
  type: T,
} & A;

export type ActionT<T> = Action<T, {}>;

export type ActionP<T, P> = Action<T, { payload: P }>;

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type Store = $ObjMap<Reducers, $ExtractFunctionReturn>;

export type NotificationSettings = {
  push_private_messages: boolean,
  push_community_invitations: boolean,
  push_video_calls: boolean,
  email_private_messages: boolean,
  email_community_invitations: boolean,
  email_video_calls: boolean,
};
