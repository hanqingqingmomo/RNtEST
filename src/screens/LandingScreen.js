// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, View } from '../atoms';
import { LaunchScreenBackground } from '../blocks';
import { getColor } from '../utils/color';
import type { ScreenProps } from '../Types';

type Props = ScreenProps<*>;

export default class LandingScreen extends Component<Props> {
  navigate = (
    route: 'AuthenticationRootScreen' | 'InvitationCodeScreen'
  ) => () => {
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      <LaunchScreenBackground>
        <View style={styles.buttonContainer}>
          <Button
            block
            color={getColor('white')}
            onPress={this.navigate('AuthenticationRootScreen')}
            size="lg"
            textColor={getColor('orange')}
            title="Get Started"
          />
        </View>
      </LaunchScreenBackground>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 275,
    alignSelf: 'center',
    marginTop: 'auto',
    paddingBottom: 48,
  },
});
