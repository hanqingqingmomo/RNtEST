// @flow

import React from 'react';

import { Image } from './index';
import { css } from '../utils/style';

type Props = {
  imageURI: string,
  size: number,
  radius?: number,
  style?: Object | number,
};

export default function Avatar({ imageURI, size, radius, style }: Props) {
  return (
    <Image
      source={{ uri: imageURI }}
      style={[
        css('borderRadius', radius || size / 2),
        css('width', size),
        css('height', size),
        style,
      ]}
    />
  );
}
