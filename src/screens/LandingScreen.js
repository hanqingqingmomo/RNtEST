// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, View } from '../atoms';
import { LaunchScreenBackground } from '../blocks';
import { getColor } from '../utils/color';

export default class LandingScreen extends React.Component {
  navigate = (
    route: 'AuthenticationRootScreen' | 'InvitationCodeScreen'
  ) => () => {
    this.props.navigation.navigate('');
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      <LaunchScreenBackground>
        <View style={styles.buttonContainer}>
          <Button
            color={getColor('white')}
            onPress={this.navigate('AuthenticationRootScreen')}
            size="lg"
            style={styles.marginBottom}
            textColor={getColor('orange')}
            title="Get Started"
          />
          <Button
            color={getColor('white')}
            onPress={this.navigate('InvitationCodeScreen')}
            outline
            size="lg"
            textColor={getColor('white')}
            title="Invitation Code"
          />
        </View>
      </LaunchScreenBackground>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  marginBottom: {
    marginBottom: 15,
  },
});
