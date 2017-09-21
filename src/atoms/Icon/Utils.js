// @flow

import fontelloConfig from './fontello/config';

// Icon names
const namesMap = fontelloConfig.glyphs.reduce((map, glyph) => {
  map[glyph.css] = glyph.css;
  return map;
}, {});

export type IconName = $Keys<typeof namesMap>;

// Icon sizes
export type IconSize = 'sm' | 'md' | 'lg' | number;

export const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export function getRealSize(size: IconSize): number {
  if (typeof size === 'string') {
    return sizeMap[size];
  }

  return size;
}
