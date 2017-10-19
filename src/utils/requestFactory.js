// @flow

import Config from 'react-native-config';
import update from 'react-addons-update';

import { selectAccessToken } from '../redux/selectors';
import { type RequestOptions } from '../atoms/Fetch';
import { join } from '../utils/url';

// const MOCK_API_URL = 'https://private-b42b8-ywca1.apiary-mock.com';

let Store: any = null;

// type Cursor = {
//   next: ?number,
//   limit?: number,
// };

export type Request = {
  url: string,
  options: RequestOptions,
};

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
      // $FlowExpectedError
      formData.append(key, {
        uri: payload[key],
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    } else {
      formData.append(key, payload[key]);
    }
  });
  return formData;
}

/**
 * Authentication requests
 */
export const makeSigninRq = (credentials: {
  email: string,
  password: string,
}) =>
  inject({
    url: join(Config.API_URL, '/v1/members/login'),
    options: {
      method: 'POST',
      body: JSON.stringify(credentials),
    },
  });

export const makeSignupRq = (body: *) =>
  inject({
    url: join(Config.API_URL, '/v1/members/signup'),
    options: {
      method: 'POST',
      body: makeFormData(body, ['photo']),
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
  });

export const makePasswordResetReq = (email: string) =>
  inject({
    url: join(Config.API_URL, '/v1/members/reset_password'),
    options: {
      method: 'POST',
      body: JSON.stringify({ email }),
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

/**
 * Read Profile
 */
export const makeReadProfileRq = (id: 'me' | string | number) =>
  inject({
    url: join(
      Config.API_URL,
      id === 'me' ? '/v1/members' : `/v1/members/${id}`
    ),
    options: { method: 'GET' },
  });

export const makeDonationRq = (donationPayload: DonationPayload) =>
  inject({
    url: join(Config.API_URL, '/v1/donations'),
    options: {
      method: 'POST',
      body: JSON.stringify(donationPayload),
    },
  });

/**
 * Organisation
 */

export const makeReadOrganisationReq = () =>
  inject({
    url: join(Config.API_URL, 'v1/communities/81bad81ca2be'),
    options: { method: 'GET' },
  });

/**
 * Communities
 */
export const makeReadCommunitiesListRq = (joinedOnly?: boolean) =>
  inject({
    url: join(
      Config.API_URL,
      `/v1/communities?membership_status=${joinedOnly ? 'joined' : ''}`
    ),
    options: {
      method: 'GET',
    },
  });

export const makeReadCommunityDetailRq = (communityId: number) =>
  inject({
    url: join(Config.API_URL, `/v1/communities/${communityId}`),
    options: {
      method: 'GET',
    },
  });

export const makeReadCommunityMembersRq = (
  communityId: number,
  limit: number
) =>
  inject({
    url: join(
      Config.API_URL,
      `/v1/communities/${communityId}/members?limit=${limit}`
    ),
    options: {
      method: 'GET',
    },
  });

/**
 * News feed requests
 */
export const makeReadAggregatedFeedRq = () =>
  inject({
    url: `${join(Config.API_URL, '/v1/content_objects/feed')}`,
    options: {
      method: 'GET',
    },
  });

export const makeReadCommunityFeedRq = (communityId: string | number) =>
  inject({
    url: `${join(Config.API_URL, `/v1/content_objects/posts/${communityId}`)}`,
    options: {
      method: 'GET',
    },
  });

/**
 * User Invitations
 */

export const makeInvitationRq = (email: string) =>
  inject({
    url: join(Config.API_URL, '/v1/club_invitations/480b7b2ed0a1'),
    options: {
      method: 'PUT',
      body: JSON.stringify({
        member_invitations: email,
      }),
    },
  });
