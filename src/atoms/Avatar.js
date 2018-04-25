// @flow

import React from 'react';

import { Image, View } from './index';
import { css } from '../utils/style';

type Props = {
  imageURI: string,
  size: number,
  radius?: number,
  style?: Object | number,
};

export default function Avatar({
  imageURI,
  size,
  style,
  radius,
  ...bag
}: Props) {
  return (
    <View
      style={[
        css('width', size),
        css('height', size),
        css('borderRadius', radius || size / 2),
        css('overflow', 'hidden'),
        style,
      ]}
    >
      <Image
        source={{ uri: imageURI }}
        style={[css('width', size), css('height', size)]}
        {...bag}
      />
    </View>
  );
}
