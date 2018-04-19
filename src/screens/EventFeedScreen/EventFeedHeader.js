// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Icon, SearchBox, View, TouchableOpacity } from '../../atoms';
import { getColor } from '../../utils/color';

type Props = NavigationScreenConfigProps & {
  onChangeText: string => void,
  onPress: Function,
  searchValue: string,
};

export default function EventFeedHeader(props: Props): React$Node {
  return (
    <View style={styles.container} radius={0}>
      <TouchableOpacity
        onPress={props.screenProps.openDrawer}
        style={styles.icon}
      >
        <Icon name="menu-1" size={20} color={getColor('orange')} />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <SearchBox
          onChangeText={props.onChangeText}
          placeholder="Search..."
          value={props.searchValue}
        />
      </View>

      <TouchableOpacity onPress={props.onPress} style={styles.icon}>
        <Icon name="plus" size={20} color="orange" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 6,
    paddingBottom: 7,
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#f6f6f6' : '#FFF',
    flexDirection: 'row',
    borderColor: '#a2a2a2',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    paddingHorizontal: 10,
  },
  searchContainer: {
    flex: 1,
  },
});
