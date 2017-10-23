// @flow

import React, { Component } from 'react';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';

import { Text } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';

type P = {
  date: Date,
  style?: Object | number,
};

export default class NewsFeedItemPostedTime extends Component<P> {
  formatDate(date: Date) {
    const diffInMinutes = differenceInMinutes(new Date(), date);
    const diff = distanceInWordsToNow(new Date(date));

    if (diffInMinutes <= 1) {
      return 'Shared just now by:';
    } else if (diffInMinutes <= 60 && diffInMinutes > 50) {
      return 'Posted 1 hour ago by:';
    } else {
      return 'Shared ' + diff + ' by:';
    }
  }

  render() {
    const { date } = this.props;

    return (
      <Text
        style={[this.props.style, css('color', getColor('gray'))]}
        size={11}
        weight="500"
        lineHeight={13}
      >
        {this.formatDate(date)}
      </Text>
    );
  }
}
