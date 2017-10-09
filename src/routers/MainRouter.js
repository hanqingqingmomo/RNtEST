// @flow

import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { Icon, Text } from '../atoms';
import { DrawerNavigator, StackNavigator } from '../navigation';
import Drawer from '../navigation/Drawer/Drawer';
import PlaygroundRouter from './playground';
import { InviteFriendsScreen, UserSettingsScreen } from '../screens';

function DrawerButton({ navigation }) {
  return <Text onPress={() => navigation.navigate('DrawerOpen')}>=</Text>;
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
              drawerIcon: (
                <Icon
                  name="invite-sidebar"
                  size={24}
                  color="rgba(69,90,100,1)"
                />
              ),
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
              drawerIcon: (
                <Icon name="settings" size={24} color="rgba(69,90,100,1)" />
              ),
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
    PlaygroundRouter: {
      screen: PlaygroundRouter,
      navigationOptions: {
        drawerIcon: <Icon name="user" size={24} color="rgba(69,90,100,1)" />,
        drawerLabel: 'Playground',
      },
    },
  },
  {
    initialRouteName: 'UserSettingsTab',
    contentComponent: Drawer,
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
