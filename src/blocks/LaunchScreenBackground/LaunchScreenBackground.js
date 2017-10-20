// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Icon, View, Screen } from '../../atoms';
import { getColor } from '../../utils/color';

type P = {
  children: React$Node,
};

export default class LandingScreen extends Component<P> {
  render() {
    return (
      <Screen fill tintColor={getColor('orange')}>
        <View style={styles.logo}>
          <Icon
            name="mpwr-logo"
            size={128}
            color={getColor('white')}
            style={styles.icon}
          />
        </View>
        {this.props.children}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
