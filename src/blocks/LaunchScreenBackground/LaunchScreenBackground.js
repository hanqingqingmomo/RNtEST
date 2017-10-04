// @flow

import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Button, View, Screen } from '../../atoms';
import { getColor } from '../../utils/color';

type P = {
  children: any,
};

export default class LandingScreen extends React.Component<void, P, void> {
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
