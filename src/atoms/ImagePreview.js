// @flow

import React, { Component } from 'react';
import { View, Image } from '../atoms';

type Props = {
  imageURI: string,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center',
};

export default class ImagePreview extends Component<Props> {
  render() {
    const {resizeMode , imageURI } = this.props;
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Image source={{ uri: imageURI }} resizeMode={resizeMode} style={{ width: '100%', height: '100%' }}/>
      </View>
    );
  }
}
