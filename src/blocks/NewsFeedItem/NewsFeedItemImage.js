// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Lightbox from 'react-native-lightbox';

import { Text, View, Image, ImagePreview } from '../../atoms';
import { css } from '../../utils/style';
import { parseTextContent } from '../../utils/text';

type P = {
  detail?: boolean,
  title?: string,
  type: string,
  url: string,
};

export default class NewsFeedItemAttachment extends Component<P> {
  renderImage(url: string): React$Element<*> {
    return (
      <View style={styles.imageWrapper}>
        <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
      </View>
    );
  }
  render() {
    const { url, title, detail } = this.props;

    return (
      <View style={styles.container}>
        {detail ? (
          <Lightbox
            underlayColor="white"
            renderContent={() => <ImagePreview imageURI={url} />}
          >
            {this.renderImage(url)}
          </Lightbox>
        ) : (
          this.renderImage(url)
        )}
        {title ? (
          <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
            {parseTextContent(title, detail ? null : 120)}
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
