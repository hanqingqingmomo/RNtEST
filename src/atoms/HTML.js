// @flow

import React, { Component } from 'react';
import HTML from 'react-native-render-html';
import { Linking, Text } from 'react-native';

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

const COLOR = { color: getColor('gray') };
const BOLD = { fontWeight: 'bold' };

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

    if (baseFontStyle) {
      COLOR.color = baseFontStyle.color || getColor('gray');
    }

    return (
      <HTML
        onLinkPress={(evt, href) => this.openUrl(href)}
        listsPrefixesRenderers={{
          ul: () => {
            return <Text style={{ ...COLOR, ...BOLD }}>&bull; </Text>;
          },
          ol: (htmlAttribs, children, convertedCSSStyles, passProps) => {
            return (
              <Text style={{ ...COLOR, ...BOLD }}>
                {`${passProps.index + 1}. `}
              </Text>
            );
          },
        }}
        tagsStyles={{
          h1: {
            ...BOLD,
            fontSize: 20,
            marginBottom: 10,
            marginTop: 20,
          },
          h2: {
            ...BOLD,
            fontSize: 18,
            marginBottom: 10,
            marginTop: 20,
          },
          ul: {
            marginVertical: 10,
          },
          ol: {
            marginVertical: 10,
          },
        }}
        baseFontStyle={{
          ...baseFontStyle,
          ...COLOR,
          fontSize: 14,
        }}
        {...bag}
      />
    );
  }
}
