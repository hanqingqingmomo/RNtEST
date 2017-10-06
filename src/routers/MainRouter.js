// @flow

import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { DrawerNavigator } from '../navigation';
import Drawer from '../navigation/Drawer/Drawer';
import { Icon } from '../atoms';
import PlaygroundRouter from './playground';

const DrawerRouter = DrawerNavigator(
  {
    PlaygroundRouter: {
      screen: PlaygroundRouter,
      navigationOptions: {
        drawerLabel: 'Playground',
        drawerIcon: <Icon name="user" size={24} color="rgba(69,90,100,1)" />,
      },
    },
  },
  {
    initialRouteName: 'PlaygroundRouter',
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
