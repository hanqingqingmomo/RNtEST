// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { View, Text } from '../../atoms';
import DrawerItem from './DrawerItem';

const Drawer = ({ ...rest }: any) => (
  <View style={styles.container}>
    <DrawerItem>
      <Text size={16} color="white">
        Hi User
      </Text>
    </DrawerItem>
    <DrawerItems {...rest} />
  </View>
);

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(31,51,61,1)',
  },
});
