// @flow

import { StackNavigator } from '../../navigation';
import { OrganisationProfileScreen } from '../../screens';

export default StackNavigator({
  OrganisationProfileScreen: {
    screen: OrganisationProfileScreen,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
});
