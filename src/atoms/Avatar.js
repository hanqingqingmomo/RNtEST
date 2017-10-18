// @flow

import React from 'react';

import { Image } from './index';
import { css } from '../utils/style';

type Props = {
  imageURI: string,
  size: number,
};

export default function Avatar({ imageURI, size }: Props) {
  return (
    <Image
      source={{ uri: imageURI }}
      style={[
        css('borderRadius', size / 2),
        css('width', size),
        css('height', size),
      ]}
    />
  );
}
