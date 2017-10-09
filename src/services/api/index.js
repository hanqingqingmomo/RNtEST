// @flow

import Config from 'react-native-config';
import { create } from 'axios';

import authentication from './authentication';
import user from './user';

const http = create({
  baseURL: Config.API_URL,
  headers: { Accept: 'application/json' },
  timeout: 10000,
});

http.interceptors.response.use(
  response => response,
  error => Promise.reject({ httpError: true, ...error })
);

export default {
  http,
  authentication: authentication(http),
  user: user(http),
};
