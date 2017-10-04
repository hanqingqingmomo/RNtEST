// @flow

import React from 'react';
import distanceInWords from 'date-fns/distance_in_words';
import { Text } from './';

type P = {
  timestamp: number,
};

export default function TimeAgo({ timestamp }: P) {
  return (
    <Text>
      {distanceInWords(timestamp, new Date(), {
        includeSeconds: true,
        addSuffix: true,
      })}
    </Text>
  );
}
