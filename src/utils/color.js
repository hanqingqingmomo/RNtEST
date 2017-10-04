// @flow

export const colors = {
  orange: 'rgba(252,97,45,1)',
  white: 'rgba(255,255,255,1)',
  green: 'rgba(0,230,118,1)',
  red: 'rgba(255,23,68,1)',
  gray: '#90A4AE',
  facebookBlue: 'rgba(59,89,152,1)',
  twitterBlue: 'rgba(29,161,242,1)',
  linkedinBlue: 'rgba(0,123,182,1)',
};

export type ColorName = $Keys<typeof colors>;

export function getColor(color: string | ColorName): string {
  if (colors[color]) {
    return colors[color];
  }

  return color;
}
