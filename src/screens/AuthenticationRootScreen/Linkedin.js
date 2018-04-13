// @flow

import React from 'react';
import Config from 'react-native-config';
import LinkedIn from 'react-native-linkedin';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet } from 'react-native';

import { Button } from '../../atoms';

type LinkedinPayload = {
  access_token: string,
  expires_in: number,
};

type LinkedinError = {
  messages: string,
  type: string,
};

export type LinkedinAuth = {
  provider: 'linkedin',
  credentials: {
    access_token: string,
  },
};

type Props = {
  onAuthStatusChange: LinkedinAuth => void,
  style: Object | number,
};

export function LinkedInModal(props: Props) {
  const { onAuthStatusChange, ...bag } = props;

  return (
    <LinkedIn
      {...styles}
      clientID={Config.LINKEDIN_ID}
      clientSecret={Config.LINKEDIN_SECRET}
      redirectUri={Config.LINKEDIN_REDIRECT_URL}
      onError={(err: LinkedinError) => {
        if (__DEV__) {
          console.log('[Linkedin] Auth Error', err);
        }
      }}
      onSuccess={(params: LinkedinPayload) => {
        if (__DEV__) {
          console.log('[Linkedin] Auth Login', params);
        }

        onAuthStatusChange({
          provider: 'linkedin',
          credentials: {
            access_token: params.access_token,
          },
        });
      }}
      renderButton={() => <Button block {...bag} size="lg" disabled />}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 15 + getStatusBarHeight(true),
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  wrapperStyle: {
    borderWidth: 0,
  },
  closeStyle: {
    top: getStatusBarHeight(true) + 3,
    left: 3,
    width: 22,
    height: 22,
  },
});
