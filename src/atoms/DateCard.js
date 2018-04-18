// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';

import { Text, View } from './index';
import { getColor } from '../utils/color';

type SizeStyle = $Keys<typeof sizeStyles>;

type Props = {
  date: Date | string,
  highlighted?: boolean,
  size: SizeStyle,
};

export default function DateCard({ date, highlighted, size }: Props) {
  const activeSizeStyle = sizeStyles[size];

  return (
    <View
      style={[
        styles.dateContainer,
        activeSizeStyle.dateContainer,
        highlighted ? styles.highlighted : styles.normal,
      ]}
    >
      <Text
        style={[
          styles.dayContainer,
          activeSizeStyle.dayContainer,
          highlighted ? styles.highlightedText : styles.normalText,
        ]}
      >
        {format(date, 'D')}
      </Text>
      <Text
        style={[
          styles.monthContainer,
          activeSizeStyle.monthContainer,
          highlighted ? styles.highlightedText : styles.normalText,
        ]}
      >
        {format(date, 'MMM')}
      </Text>
    </View>
  );
}

DateCard.defaultProps = {
  highlighted: false,
};

const sizeStyles = {
  md: StyleSheet.create({
    dateContainer: {
      height: 52,
      width: 44,
    },

    dayContainer: {
      fontSize: 20,
      lineHeight: 24,
    },

    monthContainer: {
      fontSize: 11,
      lineHeight: 13,
    },
  }),

  sm: StyleSheet.create({
    dateContainer: {
      height: 33,
      width: 28,
    },

    dayContainer: {
      fontSize: 13,
      lineHeight: 15,
    },

    monthContainer: {
      fontSize: 7,
      lineHeight: 9,
    },
  }),
};

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  dayContainer: {
    fontWeight: '700',
  },

  highlighted: {
    backgroundColor: '#FF1744',
  },

  highlightedText: {
    color: getColor('white'),
  },

  normal: {
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },

  normalText: {
    color: getColor('gray'),
  },

  monthContainer: {
    fontWeight: '600',
  },
});
