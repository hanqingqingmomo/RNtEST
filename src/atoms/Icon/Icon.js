// @flow

import React from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import fontelloConfig from './fontello/config';
import { getRealSize } from './Utils';
import { getColor } from '../../utils/color';
import {
  type ColorName,
  type Style,
  type IconName,
  type IconSize,
} from '../../Types';

type Props = {
  name: IconName,
  color: ColorName | string,
  size: IconSize,
  style?: Style,
};

export type IconProps = Props;

const FontelloIcon = createIconSetFromFontello(fontelloConfig);

export default function Icon(props: Props) {
  const { color, size, ...bag } = props;
  return (
    <FontelloIcon {...bag} size={getRealSize(size)} color={getColor(color)} />
  );
}
