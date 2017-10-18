// @flow

import Config from 'react-native-config';
import { stringify } from 'query-string';

import { type RequestOptions } from '../atoms/Fetch';
import { join } from '../utils/url';

const MOCK_API_URL = 'https://private-b42b8-ywca1.apiary-mock.com';

type Cursor = {
  next: ?number,
  limit?: number,
};

export type Request = {
  url: string,
  options: RequestOptions,
};

/**
 * Login request
 */
export const authenticateRq = (credentials: {
  email: string,
  password: string,
}) =>
  ({
    url: join(Config.API_URL, '/v1/members/login'),
    options: {
      method: 'POST',
      body: JSON.stringify(credentials),
    },
  }: Request);

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
export const readProfileRq = (id: 'me' | string | number) =>
  ({
    url: join(
      Config.API_URL,
      id === 'me' ? '/v1/members' : `/v1/members/${id}`
    ),
    options: { method: 'GET' },
  }: Request);

export const makeDonationRq = (donationPayload: DonationPayload) =>
  ({
    url: join(Config.API_URL, '/v1/donations'),
    options: {
      method: 'POST',
      body: JSON.stringify(donationPayload),
    },
  }: Request);

/**
 * Communities
 */
export const makeReadCommunitiesListRq = (joinedOnly?: boolean) =>
  ({
    url: join(
      Config.API_URL,
      `/v1/communities?membership_status=${joinedOnly ? 'joined' : ''}`
    ),
    options: {
      method: 'GET',
    },
  }: Request);

export const makeReadCommunityDetailRq = (communityId: number) =>
  ({
    url: join(Config.API_URL, `/v1/communities/${communityId}`),
    options: {
      method: 'GET',
    },
  }: Request);

export const makeReadCommunityMembersRq = (
  communityId: number,
  limit: number
) =>
  ({
    url: join(
      Config.API_URL,
      `/v1/communities/${communityId}/members?limit=${limit}`
    ),
    options: {
      method: 'GET',
    },
  }: Request);

// TODO serialise params into URL in some automated way
export const getAggegatedFeedRq = (cursor: ?Cursor) =>
  ({
    url: `${join(MOCK_API_URL, 'feed')}`,
    options: {
      method: 'GET',
    },
  }: Request);
