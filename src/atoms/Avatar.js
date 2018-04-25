// @flow

import React from 'react';

import { Image } from './index';
import { css } from '../utils/style';

type Props = {
  source: string | { uri: string } | number,
  size: number,
  radius?: number,
  style?: Object | number,
};

export default function Avatar({ source, size, radius, style }: Props) {
  return (
    <Image
      source={source}
      style={[
        css('borderRadius', radius || size / 2),
        css('width', size),
        css('height', size),
        style,
      ]}
    />
  );
}
