// @flow

import React from 'react';
import distanceInWords from 'date-fns/distance_in_words';
import { Text } from './';

type P = {
  date: string,
};

export default function TimeAgo({ date }: P) {
  return (
    <Text>
      {distanceInWords(new Date(date), new Date(), {
        includeSeconds: true,
        addSuffix: true,
      })}
    </Text>
  );
}
