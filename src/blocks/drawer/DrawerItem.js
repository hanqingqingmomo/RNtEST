// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { TouchableItem, View } from '../../atoms';

type DrawerItemProps = {
  onPress?: Function,
  children: React$Element<*>,
};

const DrawerItem = ({ onPress, children }: DrawerItemProps) => (
  <View style={styles.container}>
    {onPress && (
      <TouchableItem onPress={onPress} delayPressIn={0}>
        <ItemContent>{children}</ItemContent>
      </TouchableItem>
    )}
    {!onPress && <ItemContent>{children}</ItemContent>}
  </View>
);

export default DrawerItem;

type ItemContentProps = {
  children: React$Element<*>,
};

const ItemContent = ({ children }: ItemContentProps) => (
  <View style={styles.item}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    // marginTop: 20,
    // paddingVertical: 4,
  },
  item: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'transparent',
  },
});
