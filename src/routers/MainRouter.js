// @flow

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';

import { StackNavigator } from '../navigation';
import DrawerView from '../navigation/Drawer/Drawer';
import PlaygroundNavigator from './playground';
import UserSettingsNavigator from './UserSettingsNavigator';
import UserProfileNavigator from './UserProfileNavigator';
import InviteFriendsNavigator from './InviteFriendsNavigator';
import NotificationsSettingsNavigator from './NotificationsSettingsNavigator';
import DonationNavigator from './DonationNavigator';

const ModalNavigator = StackNavigator(
  {
    DonationModal: {
      screen: DonationNavigator,
    },
    UserProfileModal: {
      screen: UserProfileNavigator,
    },
    ProfileSettingsModal: {
      screen: UserSettingsNavigator,
    },
    NotificationsSettingsModal: {
      screen: NotificationsSettingsNavigator,
    },
    InviteFriendsNavigator: {
      screen: InviteFriendsNavigator,
    },
    PlaygroundModal: {
      screen: PlaygroundNavigator,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

type State = {
  isModalRouterOpen: boolean,
};

export default class MainRouter extends Component<{}, State> {
  state = {
    isModalRouterOpen: false,
  };
  // handleNavigationState = (previous: any, next: any, action: any) => {
  //   if (action.routeName === 'DrawerOpen') {
  //     StatusBar.setBarStyle('light-content');
  //   } else if (action.routeName === 'DrawerClose') {
  //     StatusBar.setBarStyle('dark-content');
  //   }
  // };

  openModalWithRoute = item => {
    this.setState({ isModalRouterOpen: true });
  };

  modelRouterClosed = () => {
    this.setState({ isModalRouterOpen: false });
  };

  renderNavigationView = () => {
    return <DrawerView onPress={this.openModalWithRoute} />;
  };

  render() {
    return (
      <DrawerLayout
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={this.renderNavigationView}
        useNativeAnimations
      >
        <ModalNavigator />
      </DrawerLayout>
    );
  }
}
