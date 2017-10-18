// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, SegmentedControl, View } from '../../atoms';

export const labels = ['Joined', 'Explore'];

export default function CommunitiesHeader({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="ywca" size={33} color="orange" />
      </View>
      <View style={styles.controlsContainer}>
        <SegmentedControl
          labels={labels}
          onChange={label =>
            navigation.navigate('CommunitiesScreen', { label })}
          selectedLabel={labels[0]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },

  iconContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },

  controlsContainer: {
    flex: 8,
    marginRight: 10,
  },
});
