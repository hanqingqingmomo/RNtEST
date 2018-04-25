// @flow

import React, { Component } from 'react';
import { View, Image } from '../atoms';

type Props = {
  source: string | { uri: string } | number,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center',
};

export default class ImagePreview extends Component<Props> {
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Image {...this.props} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  }
}
