// @flow

import React from 'react';

import { Image } from './index';
import { css } from '../utils/style';

type Props = {
  imageURI: string,
  imageSource?: any,
  size: number,
  radius?: number,
  style?: Object | number,
};

export default function Avatar({
  imageURI,
  size,
  radius,
  style,
  imageSource,
}: Props) {
  return (
    <Image
      source={imageURI ? { uri: imageURI } : imageSource}
      style={[
        css('borderRadius', radius || size / 2),
        css('width', size),
        css('height', size),
        style,
      ]}
    />
  );
}
