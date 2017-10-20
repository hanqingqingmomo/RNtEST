// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from './index';
import { getColor } from '../utils/color';

type Props = {
  accessoryView?: any,
  contentView?: any,
  imageView?: any,
};

export default function PopoverItem({
  accessoryView,
  contentView,
  imageView,
  ...args
}: Props) {
  if (typeof contentView === 'string') {
    contentView = (
      <Text size={15} lineHeight={18} color="#455A64">
        {contentView}
      </Text>
    );
  }

  return (
    <View style={styles.itemContainer} {...args}>
      {imageView ? (
        <View style={styles.imageContainer}>{imageView}</View>
      ) : null}
      {contentView ? (
        <View style={styles.contentContainer}>{contentView}</View>
      ) : null}
      {accessoryView ? (
        <View style={styles.accessoryContainer}>{accessoryView}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  accessoryContainer: {
    paddingLeft: 15,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  itemContainer: {
    alignItems: 'center',
    backgroundColor: getColor('white'),
    flex: 1,
    flexDirection: 'row',
    height: 44,
  },
  imageContainer: {
    paddingLeft: 15,
  },
});
