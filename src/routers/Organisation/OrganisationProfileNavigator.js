// @flow

import { StackNavigator } from '../../navigation';
import { MemberProfileScreen, OrganisationProfileScreen } from '../../screens';

export default StackNavigator({
  OrganisationProfileScreen: {
    screen: OrganisationProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  MemberProfileScreen: {
    screen: MemberProfileScreen,
  },
});
