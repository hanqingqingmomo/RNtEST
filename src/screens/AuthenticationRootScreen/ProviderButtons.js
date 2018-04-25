// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '../../atoms';
import { getColor } from '../../utils/color';
import { FacebookModal, type FacebookAuth } from './Facebook';
import { TwitterModal, type TwitterAuth } from './Twitter';
import { LinkedInModal, type LinkedinAuth } from './Linkedin';

export type AuthPayload = FacebookAuth | TwitterAuth | LinkedinAuth;

export type ButtonProps = {
  onAuthStatusChange: AuthPayload => mixed,
};

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
      color={getColor('linkedinBlue')}
      textColor={getColor('white')}
      title="Continue with LinkedIn"
      style={styles.button}
      {...props}
    />
  );
}

export function EmailRegistration(props: { onPress: Function }) {
  return (
    <Button
      block
      outline
      color={getColor('orange')}
      textColor={getColor('orange')}
      onPress={props.onPress}
      title="Sign Up"
      size="lg"
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    opacity: 1,
  },
});
