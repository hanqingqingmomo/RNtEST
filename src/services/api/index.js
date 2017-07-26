// @flow

import Config from 'react-native-config';
import { create } from 'axios';

import authentication from './authentication';

const TRANSPORT = create({
  baseURL: Config.API_URL,
  headers: { Accept: 'application/json' },
  timeout: 10000,
});

TRANSPORT.interceptors.response.use(
  response => response,
  // $FlowExpectedError
  error => Promise.reject({ httpError: true, ...error })
);

export default {
  _transport: TRANSPORT,
  authentication: authentication(TRANSPORT),
};
