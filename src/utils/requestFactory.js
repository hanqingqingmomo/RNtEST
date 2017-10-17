// @flow

import Config from 'react-native-config';

import { type RequestOptions } from '../atoms/Fetch';
import { join } from '../utils/url';

const MOCK_API_URL = 'http://private-b42b8-ywca1.apiary-mock.com';

export type Request = {
  url: string,
  options: RequestOptions,
};

type DonationPayload = {
  payment_method_nonce: string,
  amount: number,
  interval: 'one-time' | 'monthly' | 'quarterly' | 'annually',
};

export const makeDonationRq = (donationPayload: DonationPayload) =>
  ({
    url: join(Config.API_URL, '/v1/donations'),
    options: {
      method: 'POST',
      body: JSON.stringify(donationPayload),
    },
  }: Request);
