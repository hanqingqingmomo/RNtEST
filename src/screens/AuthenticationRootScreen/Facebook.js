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

type Props = $Exact<{
  color: string,
  onAuthStatusChange: FacebookAuth => void,
  style: Object | number,
  textColor: string,
  title: string,
}>;

export class FacebookModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
  }

  render() {
    return (
      <Button
        block
        color={this.props.color}
        size="lg"
        style={this.props.style}
        textColor={this.props.textColor}
        title={this.props.title}
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

                this.props.onAuthStatusChange({
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
}
