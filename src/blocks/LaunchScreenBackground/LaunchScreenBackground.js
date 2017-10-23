// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Icon, Text, View, Screen } from '../../atoms';
import { getColor } from '../../utils/color';

type P = {
  children: React$Node,
};

export default class LaunchScreenBackground extends Component<P> {
  render() {
    return (
      <Screen fill tintColor={getColor('orange')}>
        <View style={styles.logo}>
          <Icon name="mpwr-logo" size={150} color={getColor('white')} />
        </View>
        {this.props.children}
        <View style={styles.pbaLogo}>
          <Text style={styles.text}>Brought to you by</Text>
          <Icon name="pba-logo" size={28} color={getColor('white')} />
        </View>
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
  pbaLogo: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  text: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '300',
    color: getColor('white'),
  },
});
