// @flow

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Lightbox from 'react-native-lightbox';

import { Text, View, Image, ImagePreview } from '../../atoms';
import { css } from '../../utils/style';
import { parseTextContent } from '../../utils/text';

const { width } = Dimensions.get('window');

type Layout = {
  height: number,
  width: number,
  x: number,
  y: number,
};

type LayoutPayload = {
  nativeEvent: {
    layout: Layout,
  },
};

type Props = {
  isDetail?: boolean,
  title?: string,
  type: string,
  url: string,
  onPress: () => any,
};

type State = {
  size: ?{
    width: string | number,
    height: string | number,
  },
  layout: ?Layout,
};

export default class NewsFeedItemAttachment extends Component<Props, State> {
  state = {
    size: null,
    layout: null,
  };

  renderImage({ url }: Props): React$Node {
    const { layout, size } = this.state;
    const marginLeft = layout ? -1 * ((width - layout.width) / 2) : 0;

    Image.getSize(url, (origWidth, origHeight) => {
      const ratio = origWidth / origHeight;

      if (size === null) {
        this.setState({
          size: {
            width,
            height: width / ratio,
          },
        });
      }
    });

    return layout && size ? (
      <Lightbox
        style={[styles.imageWrapper, { marginLeft }]}
        underlayColor="white"
        springConfig={{ tension: 10 }}
        renderContent={() => (
          <ImagePreview resizeMode="contain" imageURI={this.props.url} />
        )}
      >
        <Image source={{ url }} style={size} />
      </Lightbox>
    ) : null;
  }

  renderTextContent({ title, isDetail }: Props): React$Node {
    return title ? (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
          {parseTextContent(title, isDetail ? null : 120)}
        </Text>
      </TouchableOpacity>
    ) : null;
  }

  onLayout = ({ nativeEvent }: LayoutPayload) => {
    if (!this.state.layout) {
      this.setState({ layout: nativeEvent.layout });
    }
  };

  render() {
    return (
      <View onLayout={this.onLayout}>
        {this.renderImage(this.props)}
        {this.renderTextContent(this.props)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    marginBottom: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
});
