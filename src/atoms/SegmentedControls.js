// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, TouchableItem, TouchableNativeFeedback, View } from './index';
import { getColor } from '../utils/color';

const HIT_SLOP = {
  top: 6,
  bottom: 6,
};

type Props = {
  labels: Array<string>,
  onChange: value => void,
  selectedLabel: string,
};

export default function SegmentedControls({
  labels,
  onChange,
  selectedLabel,
}: Props) {
  return (
    <View style={[styles.wrapper]}>
      {labels.map((label, idx) => (
        <TouchableItem
          hitSlop={HIT_SLOP}
          key={label}
          onPress={() => onChange(label)}
          style={[
            styles.touchableItem,
            ...getBorder(idx, labels.length),
            {
              backgroundColor: getColor(
                label === selectedLabel ? 'orange' : 'white'
              ),
            },
          ]}
          useForeground={Platform.select({
            android: TouchableNativeFeedback.canUseNativeForeground,
            ios: () => false,
          })()}
        >
          <Text
            style={[
              styles.radioText,
              {
                color: getColor(label === selectedLabel ? 'white' : 'orange'),
              },
            ]}
          >
            {label}
          </Text>
        </TouchableItem>
      ))}
    </View>
  );
}

const getBorder = (idx, length) => {
  if (idx === 0) {
    return [styles.borderRadiusLeft, styles.borderNotRight];
  }
  if (idx === length - 1) {
    return [styles.borderRadiusRight, styles.borderFull];
  }
  return [styles.borderNotRight];
};

const styles = StyleSheet.create({
  borderFull: {
    borderWidth: 1,
  },
  borderNotRight: {
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  borderRadiusLeft: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  borderRadiusRight: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  radioText: {
    fontSize: 13,
    lineHeight: 15,
  },
  touchableItem: {
    alignItems: 'center',
    borderColor: getColor('orange'),
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    height: 29,
  },
});
