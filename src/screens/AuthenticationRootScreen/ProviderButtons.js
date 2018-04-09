// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Config from 'react-native-config';
import LinkedInModal from 'react-native-linkedin';

import { Button } from '../../atoms';
import { getColor } from '../../utils/color';
import { FacebookModal, type FacebookAuth } from './Facebook';
import { TwitterModal, type TwitterAuth } from './Twitter';

type LinkedinPayload = {
  access_token: string,
  expires_in: number,
};

export type AuthPayload =
  | FacebookAuth
  | TwitterAuth
  | {
      provider: 'linkedin',
      credentials: {
        access_token: string,
      },
    };

export type ButtonProps = {
  onAuthStatusChange: AuthPayload => mixed,
};

function AuthenticationButton(props): React$Node {
  return <Button block {...props} size="lg" style={styles.button} />;
}

export function Facebook(props: ButtonProps) {
  return (
    <FacebookModal
      color={getColor('facebookBlue')}
      textColor={getColor('white')}
      title="Continue with Facebook"
      style={styles.button}
      {...props}
    />
  );
}

export function Twitter(props: ButtonProps) {
  return (
    <TwitterModal
      color={getColor('twitterBlue')}
      textColor={getColor('white')}
      title="Continue with Twitter"
      style={styles.button}
      {...props}
    />
  );
}

export function LinkedIn(props: ButtonProps) {
  return (
    <LinkedInModal
      clientID={Config.LINKEDIN_ID}
      clientSecret={Config.LINKEDIN_SECRET}
      redirectUri={Config.LINKEDIN_REDIRECT_URL}
      onSuccess={(params: LinkedinPayload) => {
        if (__DEV__) {
          console.log('[Linkedin] Auth Login', params);
        }

        props.onAuthStatusChange({
          provider: 'linkedin',
          credentials: {
            access_token: params.access_token,
          },
        });
      }}
      renderButton={() => (
        <AuthenticationButton
          color={getColor('linkedinBlue')}
          textColor={getColor('white')}
          title="Continue with LinkedIn"
          disabled
          style={{ opacity: 1 }}
        />
      )}
    />
  );
}

export function EmailRegistration(props: { onPress: Function }) {
  return (
    <AuthenticationButton
      outline
      color={getColor('orange')}
      textColor={getColor('orange')}
      onPress={props.onPress}
      title="Sign Up"
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    opacity: 1,
  },
});
