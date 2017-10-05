// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { ActivityIndicator } from '../atoms';
import { LaunchScreenBackground } from '../blocks';

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
        <ActivityIndicator style={styles.activityIndicator} color="white" />
      </LaunchScreenBackground>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    top: '50%',
    marginTop: 38,
  },
});
