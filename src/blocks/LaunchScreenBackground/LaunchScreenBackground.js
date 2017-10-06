// @flow

import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { View, Screen } from '../../atoms';
import { getColor } from '../../utils/color';

type P = {
  children: React$Node,
};

export default class LandingScreen extends React.Component<P, void> {
  render() {
    return (
      <Screen tintColor={getColor('orange')}>
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
