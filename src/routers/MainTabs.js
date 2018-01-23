// @flow

import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import DrawerLayout from 'react-native-drawer-layout-polyfill';
import Modal from 'react-native-modalbox';

import { Icon, Fetch, DropdownAlert } from '../atoms';
import DrawerView, { type NavigationItem } from '../navigation/Drawer/Drawer';
import DonationStack from './DonationStack';
import HelpStack from './HelpStack';
import InvitationsStack from './InvitationsStack';
import NotificationSettingsStack from './NotificationSettingsStack';
import OrganisationStack from './MainTabs/OrganisationStack';
import PlaygroundStack from './playground';
import UserProfileStack from './UserProfileStack';
import UserSettingsStack from './UserSettingsStack';
import { makeReadOrganisationReq } from '../utils/requestFactory';
import { getColor } from '../utils/color';
import { css } from '../utils/style';
import type { Community, FetchProps } from '../Types';
// Screens
import GlobalFeedStack from './MainTabs/GlobalFeedStack';
import CommunityStack from './MainTabs/CommunityStack';

let ALERT = null;

const styles = StyleSheet.create({
  tabBarIcon: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flex: 1,
    width: 50,
    paddingTop: 10,
    alignItems: 'center',
  },
});

const makeTabBarIcon = name => ({ focused, tintColor }) => (
  <View
    style={[
      styles.tabBarIcon,
      focused ? css('borderBottomColor', tintColor) : undefined,
    ]}
  >
    <Icon name={name} size={24} color={tintColor} />
  </View>
);

/**
 * Navigator
 */
const Navigator = TabNavigator(
  {
    GlobalFeedTab: {
      screen: GlobalFeedStack,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('home'),
      }),
    },
    CommunityTab: {
      screen: CommunityStack,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('communities'),
      }),
    },
  },
  {
    initialRouteName: 'GlobalFeedTab',
    lazy: true,
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: getColor('orange'),
      inactiveTintColor: '#CFD8DC',
    },
  }
);

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

export default class MainTabs extends Component<{}, State> {
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
    StatusBar.setBarStyle('dark-content');
  };

  closeModalRoute = () => {
    this.setState({ modalRoute: null });
    // TODO bring back
    StatusBar.setBarStyle('light-content');
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
    if (!modalRoute) {
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
        return <DonationStack {..._props} />;
      case 'UserProfileModal':
        return <UserProfileStack {...props} />;
      case 'UserSettingsModal':
        return <UserSettingsStack {...props} />;
      case 'NotificationsSettingsModal':
        return <NotificationSettingsStack {...props} />;
      case 'InviteFriendModal':
        return <InvitationsStack {...props} />;
      case 'PlaygroundModal':
        return <PlaygroundStack {...props} />;
      case 'HelpModal':
        return <HelpStack {...props} />;
      case 'OrganisationProfileModal':
        return <OrganisationStack {...props} />;
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
            StatusBar.setBarStyle('light-content');
          }}
          onDrawerClose={() => {
            // TODO bring back
            StatusBar.setBarStyle('dark-content');
          }}
        >
          <Navigator
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