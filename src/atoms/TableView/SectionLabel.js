// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '../index';

export default class SectionLabel extends Component {
  render() {
    return (
      <Text
        lineHeight={13}
        color="#90A4AE"
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
