// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, TouchableItem } from './index';

type Props = {
  disabled?: boolean,
  onPress: Function,
  textStyle?: Object,
  textColor?: string,
  title: string,
};

export default function NavigationTextButton(props: Props): React$Node {
  return (
    <TouchableItem
      onPress={props.onPress}
      style={styles.touchableItem}
      disabled={props.disabled}
    >
      <Text
        size={18}
        color={props.textColor || 'black'}
        style={[
          props.disabled ? styles.disabled : undefined,
          styles.text,
          props.textStyle,
        ]}
      >
        {props.title}
      </Text>
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  touchableItem: {
    marginHorizontal: 10,
  },
  text: {
    fontFamily: Platform.select({
      ios: 'AvenirNext-Regular',
      android: 'Roboto',
    }),
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.5,
  },
});
