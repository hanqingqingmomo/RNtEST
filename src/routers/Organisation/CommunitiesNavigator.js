// @flow

import { StackNavigator } from '../../navigation';
import { CommunityListScreen, CommunityLandingScreen } from '../../screens';

export default StackNavigator(
  {
    CommunityListScreen: {
      screen: CommunityListScreen,
    },

    CommunityLandingScreen: {
      screen: CommunityLandingScreen,
      navigationOptions: {
        title: 'Community',
      },
    },
  },
  {
    initialRouteName: 'CommunityListScreen',
  }
);
