// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, View } from '../atoms';
import { LaunchScreenBackground } from '../blocks';
import { getColor } from '../utils/color';

export default class LandingScreen extends React.Component {
  onGetStarted = () => {
    this.props.navigation.navigate('AuthenticationRootScreen');
  };

  onInviteCode = () => {
    this.props.navigation.navigate('InvitationCodeScreen');
  };

  render() {
    return (
      <LaunchScreenBackground>
        <View style={styles.buttonContainer}>
          <Button
            color={getColor('white')}
            onPress={this.onGetStarted}
            size="lg"
            style={styles.marginBottom}
            textColor={getColor('orange')}
            title="Get Started"
          />
          <Button
            color={getColor('white')}
            onPress={this.onInviteCode}
            outline
            size="lg"
            textColor={getColor('white')}
            title="Invite Code"
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
