// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Image } from '../../../atoms';

type Props = {
  source: string | { uri: string } | number,
};

export default class LinkPreview extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image {...this.props} resizeMode="contain" style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderColor: '#E2E2E4',
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
