// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Lightbox from 'react-native-lightbox';

import { Text, View, Image, ImagePreview } from '../../atoms';
import { css } from '../../utils/style';
import { parseTextContent } from '../../utils/text';

const WINDOW_WIDTH = Dimensions.get('window').width;

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

  computeImageSize = (origWidth: number, origHeight: number): Object => {
    const { layout } = this.state;
    const ratio = origWidth / origHeight;

    if (Platform.OS === 'android' && layout) {
      return {
        width: layout.width,
        height: layout.width / ratio,
      };
    }

    return {
      width: WINDOW_WIDTH,
      height: WINDOW_WIDTH / ratio,
    };
  };

  computeLightboxMargin = (): number => {
    const { layout } = this.state;

    if (Platform.OS === 'ios' && !!layout) {
      return -1 * ((WINDOW_WIDTH - layout.width) / 2);
    }

    return 0;
  };

  computeLightboxWidth = (): number => {
    const { layout } = this.state;

    return Platform.OS === 'android' && layout ? layout.width : WINDOW_WIDTH;
  };

  computeLightboxStyle = (): Object => ({
    marginLeft: this.computeLightboxMargin(),
    width: this.computeLightboxWidth(),
  });

  onLayout = ({ nativeEvent }: LayoutPayload) => {
    if (!this.state.layout) {
      this.setState({ layout: nativeEvent.layout });
    }
  };

  renderImage(): React$Node {
    const { url } = this.props;
    const { layout, size } = this.state;

    if (!layout) {
      return null;
    }

    if (size === null) {
      Image.getSize(url, (origWidth: number, origHeight: number) => {
        this.setState({
          size: this.computeImageSize(origWidth, origHeight),
        });
      });
    }

    return size ? (
      <Lightbox
        style={[styles.imageWrapper, this.computeLightboxStyle()]}
        underlayColor="white"
        springConfig={{ tension: 10 }}
        renderContent={() => (
          <ImagePreview
            resizeMode="contain"
            source={{ uri: url }}
            style={size}
          />
        )}
      >
        <Image source={{ uri: url }} style={size} />
      </Lightbox>
    ) : null;
  }

  renderTextContent(): React$Node {
    const { title, isDetail, onPress } = this.props;

    return title ? (
      <TouchableOpacity onPress={onPress}>
        <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
          {parseTextContent(title, isDetail ? null : 120)}
        </Text>
      </TouchableOpacity>
    ) : null;
  }

  render() {
    return (
      <View onLayout={this.onLayout}>
        {this.renderImage()}
        {this.renderTextContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    marginBottom: 11,
  },
});
