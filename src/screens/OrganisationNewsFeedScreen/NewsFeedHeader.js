// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, SearchBox, View, TouchableOpacity } from '../../atoms';

export default function NewsFeedHeader(props) {
  console.log(props);
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={props.openDrawer}>
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
});
