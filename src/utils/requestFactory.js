// @flow

import { Platform } from 'react-native';
import Config from 'react-native-config';
import AppCenter from 'appcenter';
import update from 'immutability-helper';
import { create } from 'apisauce';

import { selectAccessToken } from '../redux/selectors';
import { type RequestOptions } from '../atoms/Fetch';
import { build } from '../utils/url';
import type { Community, NotificationSettings } from '../Types';

let Store: any = null;

export type Response<D> = {
  config: Object,
  data: D,
  duration: number,
  headers: Object,
  ok: boolean,
  problem:
    | null
    | 'CLIENT_ERROR'
    | 'SERVER_ERROR'
    | 'TIMEOUT_ERROR'
    | 'CONNECTION_ERROR'
    | 'NETWORK_ERROR'
    | 'CANCEL_ERROR',
  status: number,
};

type P<T> = Promise<T>;
type RS<D> = Response<D>;

type PR<T> = Promise<Response<T>>;

export type Request = {
  url: string,
  options: RequestOptions,
};

// define the api
const api = create({
  baseURL: Config.API_URL,
  headers: { Accept: 'application/json' },
});

api.addAsyncRequestTransform(async request => {
  request.headers['x_install_id'] = await AppCenter.getInstallId();
  request.headers['x_device_platform'] = Platform.OS.toLowerCase();
  if (request.headers['API-KEY'] === undefined) {
    request.headers['API-KEY'] = selectAccessToken(Store.getState());
  }

  return request;
});

function buildUrl(options) {
  return build({
    base: Config.API_URL,
    ...options,
  });
}

/**
 * Initialise Factory function
 */
export function initFactory(store: any) {
  Store = store;
}

/**
 * Inject env variables and other stuff into request options.
 */
function inject(request: Request): Request {
  if (__DEV__ && Store === null) {
    console.error(
      "RequestFactory: you probably forgot to initialise factory. If you don't initialise factory, requests might be missing several options, such as authentication tokens."
    );
  }

  if (Store === null) {
    return request;
  }

  const headers = update(request.options.headers || {}, {
    'API-KEY': { $set: selectAccessToken(Store.getState()) },
  });

  return update(request, {
    options: { headers: { $set: headers } },
  });
}

/**
 * Convert object payload into FormData with support for files
 */
function makeFormData(payload: Object, fileNames: Array<string> = []) {
  const formData: FormData = new FormData();
  Object.keys(payload).forEach(key => {
    if (fileNames.includes(key)) {
      if (payload[key]) {
        // $FlowExpectedError
        formData.append(key, {
          uri: payload[key],
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
    } else {
      if (Array.isArray(payload[key])) {
        payload[key].forEach(value => {
          formData.append(`${key}[]`, value);
        });
      } else {
        formData.append(key, payload[key]);
      }
    }
  });
  return formData;
}

/**
 * Get Braintree client token
 */
export const readBraintreeClientTokenReq = () =>
  api.get('/members/braintree-client-token');

/**
 * Authentication requests
 */
export function RQSignIn(data: {
  email: string,
  password: string,
}): PR<{ mobile_token: string }> {
  return api.post('/members/login', data);
}

export const RQSignUp = (body: *) =>
  api.post('/members/signup', makeFormData(body, ['profile_photo']));

export const RQSocialSignIn = (body: *) =>
  api.post('/members/social-login', makeFormData(body));

export const makePasswordResetReq = (email: string) =>
  inject({
    url: buildUrl({ path: '/members/reset_password' }),
    options: {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  });

export const makeChangePasswordReq = (password: string) =>
  inject({
    url: buildUrl({ path: '/members/profile_settings' }),
    options: {
      method: 'PUT',
      body: JSON.stringify({ password }),
    },
  });

/**
 * Donations
 */

export const RQMakeDonation = (donationPayload: {
  donation: {
    payment_method_nonce: string,
    amount: number,
    interval: 'one-time' | 'monthly' | 'quarterly' | 'annually',
  },
  payer: Object,
}) => api.post('/donations', donationPayload);

/**
 * Profile
 */
// TODO remove makeReadProfileRq
export const makeReadProfileRq = (id: 'me' | string | number) =>
  inject({
    url: buildUrl({
      path: id === 'me' ? '/members' : `/members/${id}`,
    }),
    options: {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    },
  });

export const RQReadProfile = (id: 'me' | string | number) =>
  api.get(id === 'me' ? '/members' : `/members/${id}`);

export const makeUpdateProfileReq = (user: Object) =>
  inject({
    url: buildUrl({ path: '/members/profile_settings' }),
    options: {
      method: 'PUT',
      body: makeFormData(user, ['profile_photo']),
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  });

/**
 * Organisation
 */

export const makeReadOrganisationReq = () =>
  inject({
    url: buildUrl({ path: '/communities/81bad81ca2be' }),
    options: { method: 'GET' },
  });

export function RQReadCommunity(id: string): P<RS<Community>> {
  return api.get(`/communities/${id}`);
}

/**
 * Communities
 */
export const makeReadCommunitiesListRq = (joinedOnly?: boolean) =>
  inject({
    url: buildUrl({
      path: `/communities?membership_status=${
        joinedOnly ? 'joined' : 'unjoined'
      }`,
    }),
    options: {
      method: 'GET',
    },
  });

export const makeReadCommunityDetailRq = (communityId: string | number) =>
  inject({
    url: buildUrl({
      path: `/communities/${communityId}`,
    }),
    options: {
      method: 'GET',
    },
  });

export const makeReadCommunityMembersRq = (
  communityId: string | number,
  limit?: number
) =>
  inject({
    url: buildUrl({
      path: `/communities/${communityId}/members?limit=${limit}`,
    }),
    options: {
      method: 'GET',
    },
  });

// TODO change request to [DELETE] /communities/{communityId}/membership
export const RQLeaveCommunity = (
  memberId: string | number,
  communityId: string | number
) => api.delete(`/communities/${memberId}/${communityId}/membership`);

// TODO: inject authenticated profile ID, even better update URL
export const RQJoinCommunity = (
  memberId: string | number,
  communityId: string | number
) => api.post(`/communities/${memberId}/${communityId}/membership`);

/**
 * Content Object
 */
const serializeParamsToUrl = (params: Object): string =>
  Object.keys(params).reduce(
    (url, key, index) => url + (index > 0 ? '&' : '') + `${key}=${params[key]}`,
    '?'
  );

export const readContentObjectReq = (
  id: string,
  params = {
    sortComments: 'popularity',
  }
) => api.get(`/content_objects/${id}${serializeParamsToUrl(params)}`);

type ContentObject = { id: string };

export const likeContentObjectReq = (object: ContentObject) =>
  api.post(`/content_objects/${object.id}/like`);

export const unlikeContentObjectReq = (object: ContentObject) =>
  api.delete(`/content_objects/${object.id}/like`);

export const destroyContentObjectReq = (object: ContentObject) =>
  api.delete(`/content_objects/${object.id}`);

/**
 * Events
 */
export const createEvent = (data: Object) => api.post('/events', data);

export const updateEvent = (event_id: string, data: Object) =>
  api.put(`/events/${event_id}`, data);

export const deleteEvent = (event_id: string) =>
  api.delete(`/events/${event_id}`);

export const getEvent = (event_id: string, sortComments?: string) =>
  api.get(
    `/events/${event_id}?sortComments=${sortComments || 'chronological'}`
  );

export const getEvents = ({
  query,
  cursor,
  limit,
  type,
}: {
  query?: string,
  cursor?: string,
  limit?: string,
  type: 'upcoming' | 'discovery',
}) =>
  api.get(
    `/events?query=${query || ''}&cursor=${cursor || ''}&limit=${limit ||
      ''}&type=${type}`
  );

export const acceptEvent = (event_id: string, rsvp_status: string) =>
  api.post('/events/accept', { event_id, rsvp_status });

export const recentLocations = () => api.get('/places/user');

export const RQCreateEventComment = (event_id: string, text_content: string) =>
  api.post(`/events/${event_id}/comment`, { text_content });

export const getEventComments = (event_id: string, sortComments: string = '') =>
  api.get(`/events/${event_id}/comments?sortComments=${sortComments}`);

export const eventCoverPhotoUpload = (event_id: string, data: Object) =>
  api.post(
    `/events/${event_id}/cover_photo`,
    makeFormData(data, ['cover_photo'])
  );

/**
 * News feed requests
 */
export const RQWithCursor = (
  path: string,
  cursor: { limit?: ?number, next?: ?number }
) => api.get(`/${path}`, cursor);

export const makeReadPinnedItemsRq = (communityId: string | number) =>
  inject({
    url: `${buildUrl({
      path: `/content_objects/posts/${communityId}?pinned_only=true`,
    })}`,
    options: {
      method: 'GET',
    },
  });

export const RQCreatePost = (object: {
  text_content: string,
  communities: Array<string>,
  attachment?: ?string,
  cached_url?: ?string,
}) => {
  const headers = { 'Content-Type': 'multipart/form-data' };
  const data = makeFormData(object, ['attachment']);
  return api.post('/content_objects/', data, { headers });
};

export const reportReq = (object: { id: string }) =>
  api.post('/abuse_reports', { objectId: object.id });

export const makeScrapeUrlReq = (url: string) =>
  inject({
    url: buildUrl({
      path: '/content_objects/generate_thumbnail',
    }),
    options: {
      method: 'POST',
      body: JSON.stringify({ url }),
    },
  });

export const RQCreateComment = (objectId: string, text_content: string) =>
  api.post(`/content_objects/${objectId}/comment`, { text_content });

/**
 * Friend Invitations
 */

export const RQinviteFriend = (email: string) =>
  api.put('/club_invitations/480b7b2ed0a1', { member_invitations: email });

export const RQGetInvitationSmsContent = () =>
  api.get(`/communities/invitation_message`);

/**
 * Profile Notification Settings
 */
export function readNotificationsSettings(): PR<NotificationSettings> {
  return api.get(`/settings/notifications`);
}

export function updateNotificationsSettings(
  data: NotificationSettings
): PR<NotificationSettings> {
  return api.put(`/settings/notifications`, data);
}

/**
 * Push Notifications
 */
export const RQEnablePushNotifications = () =>
  api.post('/push-notifications/register');

export const RQDisablePushNotifications = () =>
  api.delete('/push-notifications/register');
