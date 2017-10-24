// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, Icon, View } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';
import { type IconName } from '../Types';

type P = {
  pinned?: boolean,
  count: number,
  iconName: IconName,
};

export default function Count({ count, iconName, pinned }: P) {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        size={18}
        color={pinned ? getColor('orange') : '#cfd8dc'}
        style={styles.icon}
      />
      <Text
        style={css('color', '#8fa3ad')}
        size={13}
        lineHeight={18}
        weight="600"
      >
        {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});
