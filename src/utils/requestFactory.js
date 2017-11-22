// @flow

import Config from 'react-native-config';
import update from 'immutability-helper';
import axios from 'axios';
import { create } from 'apisauce';

import { selectAccessToken } from '../redux/selectors';
import { type RequestOptions } from '../atoms/Fetch';
import { build } from '../utils/url';
import type { Cursor } from '../Types';

let Store: any = null;

export type Request = {
  url: string,
  options: RequestOptions,
};

// define the api
const api = create({
  baseURL: Config.API_URL,
  headers: { Accept: 'application/json' },
});

api.addRequestTransform(request => {
  if (request.headers['API-KEY'] === undefined) {
    request.headers['API-KEY'] = selectAccessToken(Store.getState());
  }
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

function wrapInAxiosRequest(config: {
  url: string,
  options: Object,
}): { url: string, options: Object, exec: () => Promise<*> } {
  return {
    url: config.url,
    options: config.options,
    exec: async () => {
      return await axios.request({
        url: config.url,
        ...config.options,
      });
    },
  };
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
          formData.append(key, value);
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
export const makeReadBTClientTokenReq = () =>
  inject({
    url: buildUrl({
      path: '/v1/members/braintree-client-token',
    }),
    options: {
      method: 'GET',
    },
  });

/**
 * Authentication requests
 */
export const makeSigninRq = (credentials: {
  email: string,
  password: string,
}) =>
  inject({
    url: buildUrl({ path: '/v1/members/login' }),
    options: {
      method: 'POST',
      body: JSON.stringify(credentials),
    },
  });

export const makeSignupRq = (body: *) =>
  inject({
    url: buildUrl({ path: '/v1/members/signup' }),
    options: {
      method: 'POST',
      body: makeFormData(body, ['profile_photo']),
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  });

export const makePasswordResetReq = (email: string) =>
  inject({
    url: buildUrl({ path: '/v1/members/reset_password' }),
    options: {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  });

export const makeChangePasswordReq = (password: string) =>
  inject({
    url: buildUrl({ path: 'v1/members/profile_settings' }),
    options: {
      method: 'PUT',
      body: JSON.stringify({ password }),
    },
  });

/**
 * Donations
 */
type DonationPayload = {
  payment_method_nonce: string,
  amount: number,
  interval: 'one-time' | 'monthly' | 'quarterly' | 'annually',
};

export const makeDonationRq = (donationPayload: DonationPayload) =>
  inject({
    url: buildUrl({ path: '/v1/donations' }),
    options: {
      method: 'POST',
      body: JSON.stringify(donationPayload),
    },
  });

/**
 * Profile
 */
export const makeReadProfileRq = (id: 'me' | string | number) =>
  inject({
    url: buildUrl({
      path: id === 'me' ? '/v1/members' : `/v1/members/${id}`,
    }),
    options: {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    },
  });

export const makeUpdateProfileReq = (user: Object) =>
  inject({
    url: buildUrl({ path: '/v1/members/profile_settings' }),
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
    url: buildUrl({ path: 'v1/communities/81bad81ca2be' }),
    options: { method: 'GET' },
  });

export const makeReadCommunityReq = (id: string) =>
  inject({
    url: buildUrl({ path: `v1/communities/${id}` }),
    options: { method: 'GET' },
  });

/**
 * Communities
 */
export const makeReadCommunitiesListRq = (joinedOnly?: boolean) =>
  inject({
    url: buildUrl({
      path: `/v1/communities?membership_status=${joinedOnly
        ? 'joined'
        : 'unjoined'}`,
    }),
    options: {
      method: 'GET',
    },
  });

export const makeReadCommunityDetailRq = (communityId: string | number) =>
  inject({
    url: buildUrl({
      path: `/v1/communities/${communityId}`,
    }),
    options: {
      method: 'GET',
    },
  });

export const makeReadCommunityMembersRq = (
  communityId: string | number,
  limit: number
) =>
  inject({
    url: buildUrl({
      path: `/v1/communities/${communityId}/members?limit=${limit}`,
    }),
    options: {
      method: 'GET',
    },
  });

export const makeLeaveCommunity = (
  memberId: string | number,
  communityId: string | number
) =>
  inject({
    url: buildUrl({
      path: `/v1/communities/${memberId}/${communityId}/membership`,
    }),
    options: {
      method: 'DELETE',
    },
  });

// TODO: inject authenticated profile ID, even better update URL
export const makeJoinCommunityReq = (
  memberId: string | number,
  communityId: string | number
) =>
  inject({
    url: buildUrl({
      path: `/v1/communities/${memberId}/${communityId}/membership`,
    }),
    options: {
      method: 'POST',
    },
  });

/**
 * Content Object
 */

export const readContentObjectReq = (id: string) =>
  api.get(`/v1/content_objects/${id}`);

type ContentObject = { id: string };

export const likeContentObjectReq = (object: ContentObject) =>
  api.post(`/v1/content_objects/${object.id}/like`);

export const unlikeContentObjectReq = (object: ContentObject) =>
  api.delete(`/v1/content_objects/${object.id}/like`);

export const destroyContentObjectReq = (object: ContentObject) =>
  api.delete(`/v1/content_objects/${object.id}`);

/**
 * News feed requests
 */
export const requestWithCursor = (path: string, cursor: Cursor) =>
  api.get(
    `${buildUrl({
      path: `v1/${path}`,
      query: {
        limit: cursor.limit,
        next: cursor.next,
      },
    })}`
  );

export const makeReadPinnedItemsRq = (communityId: string | number) =>
  inject({
    url: `${buildUrl({
      path: `/v1/content_objects/posts/${communityId}?pinned_only=true`,
    })}`,
    options: {
      method: 'GET',
    },
  });

export const createPostReq = (object: {
  text_content: string,
  communities: Array<string>,
  attachment?: ?string,
  cached_url?: ?string,
}) => api.post('/v1/content_objects/', makeFormData(object, ['attachment']));

export const reportReq = (object: {
  id: string,
  type: 'comment' | 'post' | 'user',
}) => api.post('/v1/abuse_reports', { [`${object.type}Id`]: object.id });

export const makeScrapeUrlReq = (url: string) =>
  inject({
    url: buildUrl({
      path: '/v1/content_objects/generate_thumbnail',
    }),
    options: {
      method: 'POST',
      body: JSON.stringify({ url }),
    },
  });

export const createCommentReq = (objectId: string, text_content: string) =>
  api.post(`/v1/content_objects/${objectId}/comment`, { text_content });

/**
 * Invitations
 */

export const makeInvitationRq = (email: string) =>
  inject({
    url: buildUrl({
      path: '/v1/club_invitations/480b7b2ed0a1',
    }),
    options: {
      method: 'PUT',
      body: JSON.stringify({
        member_invitations: email,
      }),
    },
  });

export const makeReadInvitationMessage = () =>
  inject({
    url: buildUrl({
      path: `/v1/communities/invitation_message`,
    }),
    options: {
      method: 'GET',
    },
  });
