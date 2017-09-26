// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';

import { Text, TouchableItem, View } from './index';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const CONTROL_HEIGHT = 30;

type Props = {
  labels: Array<string>,
  onChange: string => void,
  selectedLabel: string,
};

export default function SegmentedControl({
  labels,
  onChange,
  selectedLabel,
}: Props) {
  return (
    <View style={styles.container}>
      {labels.map((label, idx, arr) => (
        <TouchableItem
          key={label}
          pressColor={getColor('white')}
          onPress={() => onChange(label)}
          style={[
            styles.touchableWrapper,
            selectedLabel === label
              ? css('backgroundColor', getColor('orange'))
              : css('backgroundColor', 'transparent'),
            idx === 0 ? styles.leftRounded : undefined,
            idx === arr.length - 1 ? styles.rightRounded : undefined,
            idx > 0 ? styles.touchableWrapperWithoutLeftBorder : undefined,
          ]}
          underlayColor={Color(getColor('orange')).alpha(
            selectedLabel === label ? 1 : 0.2
          )}
        >
          <Text
            size={13}
            style={[
              selectedLabel === label
                ? css('color', getColor('white'))
                : css('color', getColor('orange')),
            ]}
          >
            {label}
          </Text>
        </TouchableItem>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  touchableWrapper: {
    alignItems: 'center',
    borderColor: getColor('orange'),
    borderWidth: 1,
    flexGrow: 1,
    height: CONTROL_HEIGHT - 2,
    justifyContent: 'center',
  },
  touchableWrapperWithoutLeftBorder: {
    marginLeft: -1,
  },
  leftRounded: {
    borderBottomLeftRadius: CONTROL_HEIGHT / 2,
    borderTopLeftRadius: CONTROL_HEIGHT / 2,
  },
  rightRounded: {
    borderBottomRightRadius: CONTROL_HEIGHT / 2,
    borderTopRightRadius: CONTROL_HEIGHT / 2,
  },
});
