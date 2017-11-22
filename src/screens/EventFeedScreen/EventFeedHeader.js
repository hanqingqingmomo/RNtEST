// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import {
  Icon,
  SearchBox,
  View,
  ShadowView,
  TouchableOpacity,
} from '../../atoms';
import { getColor } from '../../utils/color';

export default function EventFeedHeader() {
  return (
    <ShadowView style={styles.container}>
      <View style={styles.iconLeftContainer}>
        <TouchableOpacity>
          <Icon name="ywca" size={33} color="orange" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <SearchBox
          onChangeText={() => {}}
          placeholder={'Search...'}
          value={'Search...'}
        />
      </View>
      <View style={styles.iconRightContainer}>
        <TouchableOpacity>
          <Icon name="plus-bold" size={33} color="orange" />
        </TouchableOpacity>
      </View>
    </ShadowView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: getColor('white'),
    flexDirection: 'row',
    height: 50,
  },

  iconLeftContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },

  iconRightContainer: {
    flex: 1,
    marginRight: 10,
  },

  searchContainer: {
    flex: 8,
    marginRight: 10,
  },
});
