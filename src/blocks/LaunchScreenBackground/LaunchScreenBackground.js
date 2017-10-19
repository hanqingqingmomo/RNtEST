// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Image, View, Screen } from '../../atoms';
import { getColor } from '../../utils/color';

type P = {
  children: React$Node,
};

export default class LandingScreen extends Component<P> {
  render() {
    return (
      <Screen fill tintColor={getColor('orange')}>
        <View style={styles.logo}>
          <Image source={require('./logo.png')} />
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
