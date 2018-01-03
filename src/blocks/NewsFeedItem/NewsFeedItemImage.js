// @flow

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Lightbox from 'react-native-lightbox';

import { Text, View, Image, ImagePreview } from '../../atoms';
import { css } from '../../utils/style';
import { parseTextContent } from '../../utils/text';

type P = {
  isDetail?: boolean,
  title?: string,
  type: string,
  url: string,
  onPress: () => any,
};

export default class NewsFeedItemAttachment extends Component<P> {
  renderImage({ url }: P): React$Node {
    return (
      <Lightbox
        underlayColor="white"
        renderContent={() => (
          <ImagePreview resizeMode="contain" imageURI={this.props.url} />
        )}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ url }} style={styles.image} resizeMode="cover" />
        </View>
      </Lightbox>
    );
  }
  renderTextContent({ title, isDetail }: P): React$Node {
    return title ? (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
          {parseTextContent(title, isDetail ? null : 120)}
        </Text>
      </TouchableOpacity>
    ) : null;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage(this.props)}
        {this.renderTextContent(this.props)}
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
