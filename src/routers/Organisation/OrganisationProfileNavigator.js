// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { StackNavigator } from '../../navigation';
import { View, Screen } from '../../atoms';
import { NewsFeedItem } from '../../blocks';
import { OrganisationProfileScreen } from '../../screens';

export default StackNavigator({
  OrganisationProfileScreen: {
    screen: OrganisationProfileScreen,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
});

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
  },
});
