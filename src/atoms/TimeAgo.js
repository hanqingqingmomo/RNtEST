// @flow

import React from 'react';
import { distanceInWordsToNow } from 'date-fns';

import Text, { type Props } from './Text';

type P = {
  ...Props,
  date: string,
};

export default function TimeAgo(props: P) {
  const { date, ...textProps } = props;
  return (
    <Text {...textProps}>
      {distanceInWordsToNow(new Date(date), {
        includeSeconds: true,
        addSuffix: true,
      })}
    </Text>
  );
}
