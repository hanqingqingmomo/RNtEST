// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '../index';
import { getColor } from '../../utils/color';

type Props = {
  title: string,
};

export default class SectionLabel extends Component<Props> {
  render() {
    return (
      <Text
        lineHeight={13}
        color={getColor('gray')}
        size={12}
        weight="600"
        style={styles.container}
      >
        {this.props.title.toUpperCase()}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
});
