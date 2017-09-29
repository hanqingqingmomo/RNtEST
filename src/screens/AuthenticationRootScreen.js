// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Button, Text } from '../atoms';
import { getColor } from '../utils/color';

const BUTTON_WIDTH = 275;

const Icon = ({ style }) => (
  <View
    style={[
      style,
      {
        backgroundColor: getColor('orange'),
        height: 45,
        width: 150,
      },
    ]}
  />
);

type Props = {
  onFacebookButtonPress: Function,
  onTwitterButtonPress: Function,
  onLinkedInButtonPress: Function,
  onSignupPress: Function,
  onLoginPress: Function,
};

export default function AuthenticationRootScreen({
  onFacebookButtonPress,
  onTwitterButtonPress,
  onLinkedInButtonPress,
  onSignupPress,
  onLoginPress,
}: Props) {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.iconContainer}>
        <View style={{ width: BUTTON_WIDTH }}>
          <Icon style={styles.icon} />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          color={getColor('white')}
          onPress={onFacebookButtonPress}
          outline
          size="lg"
          style={[styles.buttonStyle, styles.facebookButton]}
          textSyle={{ marginLeft: 100 }}
          textColor={getColor('white')}
          title="Continue with Facebook"
        />
        <Button
          color={getColor('white')}
          onPress={onTwitterButtonPress}
          outline
          size="lg"
          style={[styles.buttonStyle, styles.twitterButton]}
          textColor={getColor('white')}
          title="Continue with Twitter"
        />
        <Button
          color={getColor('white')}
          onPress={onLinkedInButtonPress}
          outline
          size="lg"
          style={[styles.buttonStyle, styles.linkedinButton]}
          textColor={getColor('white')}
          title="Continue with LinkedIn"
        />
        <Button
          color={getColor('orange')}
          onPress={onSignupPress}
          outline
          size="lg"
          textColor={getColor('orange')}
          title="Sign Up"
        />
        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <Text onPress={onLoginPress} style={styles.loginText}>
            Log In
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },

  buttonStyle: {
    marginBottom: 15,
  },

  facebookButton: {
    backgroundColor: getColor('facebookBlue'),
  },

  icon: {
    alignSelf: 'flex-start',
  },

  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 45,
  },

  linkedinButton: {
    backgroundColor: getColor('linkedinBlue'),
  },

  loginContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 30,
  },

  loginText: {
    color: getColor('orange'),
    marginLeft: 2,
  },

  screenContainer: {
    backgroundColor: getColor('white'),
    flex: 1,
    flexDirection: 'column',
  },

  twitterButton: {
    backgroundColor: getColor('twitterBlue'),
  },
});
