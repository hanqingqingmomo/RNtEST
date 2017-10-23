// @flow

export const colors = {
  orange: '#fd5a1e',
  white: '#ffffff',
  green: '#00e676',
  red: '#ff1744',
  linkBlue: '#00B0FF',
  gray: '#90A4AE',
  facebookBlue: '#3b5998',
  twitterBlue: '#1da1f2',
  linkedinBlue: '#007bb6',
};

export type ColorName = $Keys<typeof colors>;

export function getColor(color: string | ColorName): string {
  if (colors[color]) {
    return colors[color];
  }

  return color;
}
