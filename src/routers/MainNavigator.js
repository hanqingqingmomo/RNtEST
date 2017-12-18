// @flow

import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout-polyfill';
import Modal from 'react-native-modalbox';

import { Fetch, View, DropdownAlert } from '../atoms';
import DrawerView, { type NavigationItem } from '../navigation/Drawer/Drawer';
import DonationNavigator from './DonationNavigator';
import HelpNavigator from './HelpNavigator';
import InviteFriendsNavigator from './InviteFriendsNavigator';
import NotificationsSettingsNavigator from './NotificationsSettingsNavigator';
import MainOrganisationNavigator from './Organisation/MainOrganisationNavigator';
import OrganisationProfileNavigator from './Organisation/OrganisationProfileNavigator';
import PlaygroundNavigator from './playground';
import UserProfileNavigator from './UserProfileNavigator';
import UserSettingsNavigator from './UserSettingsNavigator';
import { makeReadOrganisationReq } from '../utils/requestFactory';
import type { Community, FetchProps } from '../Types';

let ALERT = null;

global.alertWithType = function(...args) {
  if (ALERT) {
    ALERT.alertWithType(...args);
  }
};

const navigationItems: Array<NavigationItem> = [
  {
    name: 'Your Profile',
    icon: 'user',
    routeName: 'UserProfileModal',
  },
  {
    name: 'Notifications',
    icon: 'notification',
    routeName: 'NotificationsSettingsModal',
  },
  {
    name: 'Settings',
    icon: 'settings',
    routeName: 'UserSettingsModal',
  },
  {
    name: 'Help',
    icon: 'chat-start',
    routeName: 'HelpModal',
  },
  {
    name: 'Invite Friends',
    icon: 'invite-sidebar',
    routeName: 'InviteFriendModal',
  },
];

if (__DEV__) {
  navigationItems.push({
    name: 'Playground',
    icon: 'smile',
    routeName: 'PlaygroundModal',
  });
}

type State = {
  modalRoute: ?NavigationItem,
};

export default class MainNavigator extends Component<{}, State> {
  state = {
    modalRoute: null,
  };

  _drawerRef = null;

  drawerRef = (ref: any) => {
    this._drawerRef = ref;
  };

  openDonationModal = () => {
    this.openModalRoute({
      name: 'Donation',
      routeName: 'DonationModal',
      icon: 'none',
    });
  };

  openOrganisationModal = () => {
    this.openModalRoute({
      name: '',
      routeName: 'OrganisationProfileModal',
      icon: 'none',
    });
  };

  openModalRoute = (item: NavigationItem) => {
    this.setState({ modalRoute: item });
    // TODO bring back
    // StatusBar.setBarStyle('dark-content');
  };

  closeModalRoute = () => {
    this.setState({ modalRoute: null });
    // TODO bring back
    // StatusBar.setBarStyle('light-content');
  };

  renderNavigationView = () => {
    const readOrganisationReq = makeReadOrganisationReq();

    return (
      <Fetch
        url={readOrganisationReq.url}
        options={readOrganisationReq.options}
      >
        {({ data }: FetchProps<Community>) => (
          <DrawerView
            navigationItems={navigationItems}
            handleNavigationItemPress={this.openModalRoute}
            handleDonationButtonPress={this.openDonationModal}
            handleOrganisationTilePress={this.openOrganisationModal}
            data={data}
          />
        )}
      </Fetch>
    );
  };

  renderModalRoute = () => {
    const modalRoute = this.state.modalRoute;
    if (modalRoute === null) {
      return null;
    }

    const props = {
      screenProps: {
        dismissModalRoute: this.closeModalRoute,
      },
    };

    switch (modalRoute.routeName) {
      case 'DonationModal':
        const _props = {
          screenProps: {
            dismissModalRoute: this.closeModalRoute,
            openModalRoute: this.openModalRoute,
          },
        };
        return <DonationNavigator {..._props} />;
      case 'UserProfileModal':
        return <UserProfileNavigator {...props} />;
      case 'UserSettingsModal':
        return <UserSettingsNavigator {...props} />;
      case 'NotificationsSettingsModal':
        return <NotificationsSettingsNavigator {...props} />;
      case 'InviteFriendModal':
        return <InviteFriendsNavigator {...props} />;
      case 'PlaygroundModal':
        return <PlaygroundNavigator {...props} />;
      case 'HelpModal':
        return <HelpNavigator {...props} />;
      case 'OrganisationProfileModal':
        return <OrganisationProfileNavigator {...props} />;
      default:
        if (__DEV__) {
          console.warn(
            `Navigation to nonexisting route: ${modalRoute.routeName}`
          );
        }
        return null;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerLayout
          ref={this.drawerRef}
          useNativeAnimations
          drawerWidth={Math.min(Dimensions.get('window').width - 50, 300)}
          drawerPosition={DrawerLayout.positions.Left}
          renderNavigationView={this.renderNavigationView}
          onDrawerOpen={() => {
            // TODO bring back
            // StatusBar.setBarStyle('light-content');
          }}
          onDrawerClose={() => {
            // TODO bring back
            // StatusBar.setBarStyle('dark-content');
          }}
        >
          <MainOrganisationNavigator
            screenProps={{
              openFriendsInvitationModal: () => {
                this.openModalRoute({
                  routeName: 'InviteFriendModal',
                });
              },
              openDrawer: () => {
                if (this._drawerRef) {
                  this._drawerRef.openDrawer();
                }
              },
            }}
          />
        </DrawerLayout>
        <Modal
          swipeToClose={false}
          isOpen={this.state.modalRoute !== null}
          onClosed={this.closeModalRoute}
        >
          {this.renderModalRoute()}
        </Modal>
        <DropdownAlert
          ref={ref => (ALERT = ref)}
          styles={{
            success: {
              icon: null,
            },
            pushNotification: {
              icon: null,
              backgroundColor: 'pink',
            },
          }}
          containerStyle={{
            backgroundColor: '#F0F3F9',
            borderBottomColor: '#ddd',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    );
  }
}
