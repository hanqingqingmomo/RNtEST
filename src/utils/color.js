// @flow

export const colors = {
  orange: '#fc612d',
  blue: '#00b0ff',
  white: '#ffffff',
  green: '#00e676',
  red: '#ff1744',
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
