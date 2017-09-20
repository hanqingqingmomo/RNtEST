// @flow

import { StyleSheet } from 'react-native';

import { type ColorName } from '../Types';

type RawStyleSheet<T> = { [key: $Keys<T>]: Object };

type StyleSheetDefinition<T> = { [key: $Keys<T>]: number };

export const colors = {
  orange: 'rgba(252,97,45,1)',
  white: 'rgba(255,255,255,1)',
  green: 'rgba(0,230,118,1)',
  // specific colors
  facebookBlue: 'rgba(59,89,152,1)',
  twitterBlue: 'rgba(29,161,242,1)',
  linkedinBlue: 'rgba(0,123,182,1)',
};

function createStyleDefinitionForCssProp<T: Object>(
  colors: T,
  cssProp: string
): StyleSheetDefinition<T> {
  const styleDef: RawStyleSheet<T> = Object.keys(
    colors
  ).reduce((map, colorName: ColorName) => {
    map[colorName] = { [cssProp]: getColor(colorName) };
    return map;
  }, {});

  return StyleSheet.create(styleDef);
}

// Create static style definitions
const textStyles = createStyleDefinitionForCssProp(colors, 'color');

const backgroundStyles = createStyleDefinitionForCssProp(
  colors,
  'backgroundColor'
);

// Export getter functions
export function getColor(colorName: ColorName): string {
  return colors[colorName];
}

export function getColorStyle(colorName: ColorName): number {
  return textStyles[colorName];
}

export function getBackgroundStyle(colorName: ColorName): number {
  return backgroundStyles[colorName];
}
