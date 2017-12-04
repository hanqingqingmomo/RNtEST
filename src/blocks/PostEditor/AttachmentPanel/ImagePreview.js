// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Image } from '../../../atoms';

type Props = {
  image: string,
};

export default class LinkPreview extends React.Component<Props> {
  render() {
    const { image } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
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
