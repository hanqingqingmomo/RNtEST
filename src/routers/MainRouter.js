// @flow

import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { Icon, Text } from '../atoms';
import { DrawerNavigator, StackNavigator } from '../navigation';
import Drawer from '../navigation/Drawer/Drawer';
import PlaygroundRouter from './playground';
import { InviteFriendsScreen, UserSettingsScreen } from '../screens';
import { type IconName } from '../Types';
function DrawerButton({ navigation }) {
  return <Text onPress={() => navigation.navigate('DrawerOpen')}>=</Text>;
}

function DrawerIcon({ name }: { name: IconName }) {
  return <Icon size={24} color="#455a64" name={name} />;
}

const DrawerRouter = DrawerNavigator(
  {
    InviteFriendsTab: {
      screen: StackNavigator(
        {
          InviteFriendsScreen: {
            screen: InviteFriendsScreen,
            navigationOptions: ({ navigation }) => ({
              drawerLabel: 'Invite Friends',
              drawerIcon: <DrawerIcon name="invite-sidebar" />,
              headerLeft: <DrawerButton navigation={navigation} />,
              headerTitle: 'Intive Friends',
            }),
          },
        },
        {
          ...StyleSheet.create({
            cardStyle: {
              backgroundColor: 'white',
            },
          }),
        }
      ),
    },
    HelpTab: {
      screen: StackNavigator(
        {
          InviteFriendsScreen: {
            screen: () => <Text>Help</Text>,
            navigationOptions: ({ navigation }) => ({
              drawerLabel: 'Help',
              drawerIcon: <DrawerIcon name="chat-start" />,
              headerLeft: <DrawerButton navigation={navigation} />,
              headerTitle: 'Help',
            }),
          },
        },
        {
          ...StyleSheet.create({
            cardStyle: {
              backgroundColor: 'white',
            },
          }),
        }
      ),
    },
    NotificationsTab: {
      screen: StackNavigator(
        {
          InviteFriendsScreen: {
            screen: InviteFriendsScreen,
            navigationOptions: ({ navigation }) => ({
              drawerLabel: 'Notifications',
              drawerIcon: <DrawerIcon name="notification" />,
              headerLeft: <DrawerButton navigation={navigation} />,
              headerTitle: 'Intive Friends',
            }),
          },
        },
        {
          ...StyleSheet.create({
            cardStyle: {
              backgroundColor: 'white',
            },
          }),
        }
      ),
    },
    UserSettingsTab: {
      screen: StackNavigator(
        {
          UserSettingsScreen: {
            screen: UserSettingsScreen,
            navigationOptions: ({ navigation }) => ({
              drawerLabel: 'Settings',
              drawerIcon: <DrawerIcon name="settings" />,
              headerLeft: <DrawerButton navigation={navigation} />,
              headerTitle: 'Settings',
            }),
          },
        },
        {
          ...StyleSheet.create({
            cardStyle: {
              backgroundColor: 'white',
            },
          }),
        }
      ),
    },
    UserProfileTab: {
      screen: StackNavigator(
        {
          UserSettingsScreen: {
            screen: UserSettingsScreen,
            navigationOptions: ({ navigation }) => ({
              drawerLabel: 'Your Profile',
              drawerIcon: <DrawerIcon name="user" />,
              headerLeft: <DrawerButton navigation={navigation} />,
              headerTitle: 'Your Profile',
            }),
          },
        },
        {
          ...StyleSheet.create({
            cardStyle: {
              backgroundColor: 'white',
            },
          }),
        }
      ),
    },
    PlaygroundRouter: {
      screen: PlaygroundRouter,
      navigationOptions: {
        drawerIcon: <DrawerIcon name="user" />,
        drawerLabel: 'Playground',
      },
    },
  },
  {
    initialRouteName: 'UserSettingsTab',
    contentComponent: Drawer,
    order: [
      'UserProfileTab',
      'NotificationsTab',
      'UserSettingsTab',
      'HelpTab',
      'InviteFriendsTab',
      'PlaygroundRouter',
    ],
  }
);

export default class MainRouter extends Component<{}, void> {
  handleNavigationState = (previous: any, next: any, action: any) => {
    if (action.routeName === 'DrawerOpen') {
      StatusBar.setBarStyle('light-content');
    } else if (action.routeName === 'DrawerClose') {
      StatusBar.setBarStyle('dark-content');
    }
  };

  render() {
    return (
      <DrawerRouter onNavigationStateChange={this.handleNavigationState} />
    );
  }
}
