// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

export default function SectionHeader({ headerLeft, headerRight }) {
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}
    >
      <Text
        color="#90A4AE"
        style={[
          styles.headerContainer,
          styles.headerText,
          css('alignSelf', 'flex-start'),
        ]}
      >
        {headerLeft.toUpperCase()}
      </Text>
      <Text
        color={getColor('orange')}
        onPress={() => {}}
        style={[
          styles.headerContainer,
          styles.headerText,
          css('alignSelf', 'flex-end'),
        ]}
      >
        {headerRight.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
  },

  headerText: {
    lineHeight: 13,
    fontSize: 12,
    fontWeight: '600',
  },
});
