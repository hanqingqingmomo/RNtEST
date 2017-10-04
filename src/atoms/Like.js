// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableItem, Text, Icon, View } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type P = {
  count: number,
  liked?: boolean,
  onPress: Function,
  name: string,
};

export default function Like({ count, liked, onPress, name }: P) {
  return (
    <TouchableItem onPress={onPress}>
      <View style={styles.container}>
        <Icon
          name={name}
          size={14}
          style={[
            styles.icon,
            liked ? css('color', getColor('red')) : css('color', '#cfd8dc'),
          ]}
        />
        <Text style={css('color', '#8fa3ad')} size={13}>
          {count}
        </Text>
      </View>
    </TouchableItem>
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
