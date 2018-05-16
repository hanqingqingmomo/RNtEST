// @flow

import React from 'react';
import Config from 'react-native-config';
import { NativeModules } from 'react-native';
import { Button } from '../../atoms';

type TwitterPayload = {
  authToken: string,
  authTokenSecret: string,
  email: string,
  name: string,
  userID: string,
  userName: string,
};

export type TwitterAuth = {
  provider: 'twitter',
  credentials: {
    access_token: string,
    access_token_secret: string,
  },
};

type Props = {
  onAuthStatusChange: TwitterAuth => void,
  style: Object | number,
};

export class TwitterModal extends React.Component<Props> {
  constructor(props) {
    super(props);
    NativeModules.RNTwitterSignIn.init(
      Config.TWITTER_ID,
      Config.TWITTER_SECRET
    );
  }

  render() {
    return (
      <Button
        block
        {...this.props}
        size="lg"
        onPress={async () => {
          try {
            const data: TwitterPayload = await NativeModules.RNTwitterSignIn.logIn();
            this.props.onAuthStatusChange({
              provider: 'twitter',
              credentials: {
                access_token: data.authToken,
                access_token_secret: data.authTokenSecret,
              },
            });
            if (__DEV__) {
              console.log('[Twitter] Auth Login', data);
            }
          } catch (error) {
            if (__DEV__) {
              console.log('[Twitter] Auth Error', error);
            }
          }
        }}
      />
    );
  }
}
