// @flow

import React from 'react';
import { Linking } from 'react-native';

import { TouchableItem } from '../atoms';

type P = {
  type: 'mail' | 'phone',
  value: string,
};

const PROTOCOL_MAP = {
  phone: 'tel',
  mail: 'mailto',
};

export default class Link extends React.Component<*, P, *> {
  openUrl = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  onPress = () => {
    const { type, value } = this.props;

    this.openUrl(`${PROTOCOL_MAP[type]}:${value}`);
  };

  render() {
    return (
      <TouchableItem onPress={this.onPress}>
        {this.props.children}
      </TouchableItem>
    );
  }
}
