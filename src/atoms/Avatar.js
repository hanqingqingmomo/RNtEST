// @flow

import React from 'react';
import { Image } from 'react-native';

type Props = {
  imageURI: string,
  size: number,
};

export default function Avatar({ imageURI, size }: Props) {
  return (
    <Image
      source={{ uri: imageURI }}
      style={[
        {
          borderRadius: size / 2,
          height: size,
          width: size,
        },
      ]}
    />
  );
}
