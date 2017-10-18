// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Image } from '../../atoms';
import { css } from '../../utils/style';

type P = {
  title?: string,
  type: string,
  url: string,
};

export default class NewsFeedItemAttachment extends Component<P> {
  render() {
    const { url, title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        {title ? (
          <Text
            size={14}
            lineHeight={18}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={css('color', '#455A64')}
          >
            {title}
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  imageWrapper: {
    height: 200,
    marginBottom: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -26,
    marginLeft: -26,
  },
  image: {
    width: '100%',
    height: 200,
  },
});
