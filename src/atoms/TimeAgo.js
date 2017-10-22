// @flow

import React from 'react';
import { distanceInWordsToNow } from 'date-fns';
import { Text } from './';

type P = {
  date: string,
};

export default function TimeAgo({ date }: P) {
  return (
    <Text>
      {distanceInWordsToNow(new Date(date), {
        includeSeconds: true,
        addSuffix: true,
      })}
    </Text>
  );
}
