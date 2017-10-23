// @flow

import React, { Component } from 'react';
import { Linking } from 'react-native';

import { TouchableItem } from '../atoms';

type P = {
  type: 'https' | 'mail' | 'phone',
  value: string,
  children: React$Element<*>,
};

const PROTOCOL_MAP = {
  phone: 'tel:',
  mail: 'mailto:',
  https: 'https://',
};

export default class Link extends Component<P> {
  openUrl = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  onPress = () => {
    const { type, value } = this.props;

    this.openUrl(`${PROTOCOL_MAP[type]}${value}`);
  };

  render() {
    return (
      <TouchableItem onPress={this.onPress}>
        {this.props.children}
      </TouchableItem>
    );
  }
}
