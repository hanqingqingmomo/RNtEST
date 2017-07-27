// @flow

import { type Axios } from 'axios';
import { type User } from '../../Types';

type Service = {
  getProfile(accessToken: string): Promise<User>,
  verifyCredentials(email: string, password: string): Promise<string>,
};

/**
 * Get user profile.
 * @TODO implement your own profile retrieval
 */
const getProfile = transport => async accessToken => {
  return {
    id: 1,
    firstName: 'John',
    lastName: 'Wick',
    email: 'john@wick.com',
  };
};

/**
 * Verify users credentials
 * Returns access token or throws HTTP exception.
 * @TODO implement your credentials verification!
 */
const verifyCredentials = transport => async (email, password) => {
  if (Math.random() < 0.5) {
    // Failing request
    await transport.post('bin/f44f7512-1a41-4757-a963-6e82b65aeb2a');
  }

  // Success request
  return '{{access token}}';
};

export default function factory(transport: Axios): Service {
  return {
    getProfile: getProfile(transport),
    verifyCredentials: verifyCredentials(transport),
  };
}
