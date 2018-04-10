// @flow

import React from 'react';
import { Alert } from 'react-native';
import { FBLoginManager } from 'react-native-facebook-login';

import { Button } from '../../atoms';

type Permissions = Array<string>;

export type FacebookAuth = {
  provider: 'facebook',
  credentials: {
    access_token: string,
  },
};

type FacebookPayload = {
  credentials: {
    permissions: Permissions,
    token: string,
    tokenExpirationDate: Date,
    userId: string,
  },
  declinedPermissions: Permissions,
  profile: {
    age_range: { min: number },
    email: string,
    first_name: string,
    gender: string,
    id: string,
    last_name: string,
    link: string,
    locale: string,
    name: string,
    picture: {
      data: {
        height: number,
        is_silhouette: boolean,
        url: string,
        width: number,
      },
    },
    timezone: number,
    updated_time: Date,
    verified: boolean,
  },
  provider?: 'facebook',
  type: 'success',
};

type FacebookError = {
  declinedPermissions: Permissions,
  message: string,
  provider: 'facebook',
  type: 'error',
};

type Props = {
  onAuthStatusChange: FacebookAuth => void,
  style: Object | number,
};

export function FacebookModal(props: Props) {
  const { onAuthStatusChange, ...bag } = props;

  FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);

  return (
    <Button
      block
      {...bag}
      size="lg"
      onPress={() => {
        if (__DEV__) {
          console.log('[Facebook] Auth Login start');
        }

        FBLoginManager.loginWithPermissions(
          ['email', 'public_profile'],
          (error: FacebookError, data: FacebookPayload) => {
            if (!error) {
              if (__DEV__) {
                console.log('[Facebook] Auth Login end', data);
              }

              onAuthStatusChange({
                provider: data.provider || 'facebook',
                credentials: {
                  access_token: data.credentials.token,
                },
              });

              FBLoginManager.logout(() => {
                if (__DEV__) {
                  console.log('[Facebook] Auth Logout');
                }
              });
            } else {
              if (__DEV__) {
                console.log('[Facebook] Auth Error', error);
              }

              if (error.message) {
                Alert.alert('Error', error.message);
              }
            }
          }
        );
      }}
    />
  );
}
