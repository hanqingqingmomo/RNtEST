// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, TouchableItem } from './index';
import { type IconName } from '../Types';

type Props = {
  disabled?: boolean,
  name: IconName,
  onPress: Function,
};

const styles = StyleSheet.create({
  touchableItem: {
    margin: 10,
  },

  disabled: {
    opacity: 0.5,
  },
});

export default function NavigationTextButton(props: Props) {
  return (
    <TouchableItem
      onPress={props.onPress}
      style={styles.touchableItem}
      disabled={props.disabled}
    >
      <Icon name={props.name} size="md" />
    </TouchableItem>
  );
}
