// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { ActivityIndicator } from '../atoms';
import { LaunchScreenBackground } from '../blocks';

export default class LandingScreen extends Component<{}> {
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
