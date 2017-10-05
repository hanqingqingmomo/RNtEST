// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, Text, View } from './index';
import { getColor } from '../utils/color';

type Props = {
  accessoryView?: Object,
  contentView: string,
  imageView: Icon,
};

export default function PopoverItem({
  accessoryView,
  contentView,
  imageView,
}: Props) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>{imageView}</View>
      <Text style={styles.contentContainer}>{contentView}</Text>
      <View style={styles.accessoryContainer}>{accessoryView}</View>
    </View>
  );
}

PopoverItem.defaultProps = {
  accessoryView: null,
};

const styles = StyleSheet.create({
  accessoryContainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },

  contentContainer: {
    flex: 7,
    fontSize: 15,
    marginLeft: 20,
  },

  itemContainer: {
    alignItems: 'center',
    backgroundColor: getColor('white'),
    flex: 1,
    flexDirection: 'row',
    height: 40,
  },

  imageContainer: {
    flex: 1,
    marginLeft: 20,
  },
});
