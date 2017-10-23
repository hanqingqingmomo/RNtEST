// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../index';
import { getColor } from '../../utils/color';

type Props = {
  title: string,
  link: string,
  onPress: Function,
};

export default class HeaderWithLink extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text lineHeight={13} size={12} weight="600" color={getColor('gray')}>
          {this.props.title.toUpperCase()}
        </Text>
        <Text
          lineHeight={13}
          size={12}
          weight="600"
          color={getColor('orange')}
          onPress={this.props.onPress}
        >
          {this.props.link.toUpperCase()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
