// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, TouchableItem } from './index';
import type { IconName, ColorName } from '../Types';

type Props = {
  color: ColorName | string,
  disabled?: boolean,
  name: IconName,
  onPress: () => void,
};

export default function NavigationTextButton(props: Props) {
  return (
    <TouchableItem
      onPress={props.onPress}
      style={styles.touchableItem}
      disabled={props.disabled}
    >
      <Icon
        name={props.name}
        color={props.color}
        size="md"
        style={{ backgroundColor: 'transparent' }}
      />
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  touchableItem: {
    margin: 10,
  },

  disabled: {
    opacity: 0.5,
  },
});
