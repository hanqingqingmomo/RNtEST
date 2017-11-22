// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, SearchBox, Text, View, TouchableOpacity } from '../../atoms';
import { getColor } from '../../utils/color';

export default function NewsFeedHeader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={props.openDrawer}>
          <Icon name="menu-1" size={20} color={getColor('orange')} />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.searchContainer}>
        <SearchBox
          onChangeText={() => {}}
          placeholder={'Search...'}
          value={'Search...'}
        />
      </View> */}
      {/* <View style={styles.logoContainer}>
        <Icon color="orange" name="mpwr-logo" size={44} />
      </View> */}
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

  searchContainer: {
    flex: 8,
    marginRight: 10,
  },

  logoContainer: {
    flex: 8,
    marginRight: 10,
  },
});
