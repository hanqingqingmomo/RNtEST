// @flow

import { StyleSheet } from 'react-native';

import { StackNavigator } from '../../navigation';
import {
  OrganisationMemberProfileScreen,
  OrganisationProfileScreen,
} from '../../screens';

export default StackNavigator({
  OrganisationProfileScreen: {
    screen: OrganisationProfileScreen,
    navigationOptions: {
      header: null,
      headerTitle: 'Organization Profile',
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
