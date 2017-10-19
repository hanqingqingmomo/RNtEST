// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableItem, Text, Icon, View } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type P = {
  count: number,
  liked?: boolean,
  iconName: string,
};

export default function Like({ count, liked, onPress, iconName }: P) {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        size={18}
        color={liked ? getColor('orange') : '#cfd8dc'}
        style={[styles.icon]}
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
