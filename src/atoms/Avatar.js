// @flow

import React from 'react';
import { Image } from 'react-native';

type Props = {
  imageUri: string,
  size: number,
};

export default function Avatar({ imageUri, size }: Props) {
  return (
    <Image
      source={{ uri: imageUri }}
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
