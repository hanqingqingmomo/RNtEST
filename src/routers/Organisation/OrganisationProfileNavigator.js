// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { StackNavigator } from '../../navigation';
import {
  OrganisationMemberProfileScreen,
  OrganisationProfileScreen,
} from '../../screens';

export default StackNavigator({
  OrganisationProfileScreen: {
    screen: props => <OrganisationProfileScreen {...props} />,
    navigationOptions: {
      header: null,
    },
  },
  OrganisationMemberProfileScreen: {
    screen: OrganisationMemberProfileScreen,
  },
});

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
  },
});
