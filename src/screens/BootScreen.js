// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { ActivityIndicator } from '../atoms';
import { LaunchScreenBackground } from '../blocks';

export default class BootScreen extends Component<{}> {
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
    marginTop: 'auto',
    paddingBottom: 60,
  },
});
