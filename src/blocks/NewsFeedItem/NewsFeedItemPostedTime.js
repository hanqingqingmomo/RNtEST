// @flow

import React from 'react';
import {
  distanceInWordsToNow,
  differenceInMinutes,
  differenceInHours,
} from 'date-fns';

import { Text } from '../../atoms';

type P = {
  date: Date,
};

export default class NewsFeedItemHeader extends React.Component<*, P, *> {
  formatDate(date: Date) {
    const diffInMinutes = differenceInMinutes(date, new Date());
    const diffInHours = differenceInHours(date, new Date());
    const diff = distanceInWordsToNow(date);

    if (diffInMinutes < 1) {
      return 'Shared just now by:';
    } else if (diffInHours < 1) {
      return 'Posted 1 hour ago by:';
    } else {
      return 'Shared ' + diff + ' by:';
    }
  }

  render() {
    const { date } = this.props;

    return (
      <Text
        style={this.props.style}
        color="#90A4AE"
        size={11}
        weight="500"
        lineHeight={13}
      >
        {this.formatDate(date)}
      </Text>
    );
  }
}
