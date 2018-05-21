// @flow

import React, { Component } from 'react';
import HTML from 'react-native-render-html';
import { Linking } from 'react-native';

import { getColor } from '../utils/color';

type Props = {
  renderers?: Object,
  ignoredTags?: Array<mixed>,
  ignoredStyles?: Array<mixed>,
  allowedStyles?: Array<mixed>,
  decodeEntities?: Boolean,
  debug?: Boolean,
  listsPrefixesRenderers?: Object,
  ignoreNodesFunction?: Function,
  alterData?: Function,
  alterChildren?: Function,
  alterNode?: Function,
  html?: string,
  uri?: string,
  tagsStyles?: Object,
  classesStyles?: Object,
  containerStyle?: mixed,
  customWrapper?: Function,
  onLinkPress?: Function,
  onParsed?: Function,
  imagesMaxWidth?: number,
  staticContentMaxWidth?: number,
  imagesInitialDimensions?: {
    width: number,
    height: number,
  },
  emSize?: number,
  ptSize?: number,
  baseFontStyle?: Object,
  textSelectable?: Boolean,
  renderersProps?: Object,
};

export default class HTMLText extends Component<Props> {
  openUrl = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  render(): React$Node {
    const { renderers, baseFontStyle, ...bag } = this.props;

    return (
      <HTML
        onLinkPress={(evt, href) => this.openUrl(href)}
        tagsStyles={{
          h1: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 10,
          },
          h2: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 10,
          },
          ul: {
            marginVertical: 10,
          },
          ol: {
            marginVertical: 10,
          },
        }}
        baseFontStyle={{
          fontSize: 14,
          color: getColor('gray'),
          ...baseFontStyle,
        }}
        {...bag}
      />
    );
  }
}
