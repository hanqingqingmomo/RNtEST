// @flow

import React, { Component } from 'react';

import { Text } from '../../atoms';
import { TabNavigator } from '../../navigation';

class NewsScreen extends Component<{}, void> {
  static navigationOptions = {
    tabBarLabel: 'News',
  };

  render() {
    return <Text>NewsScreen</Text>;
  }
}

class MembersScreen extends Component<{}, void> {
  static navigationOptions = {
    tabBarLabel: 'Members (123)',
  };

  render() {
    return <Text>MembersScreen</Text>;
  }
}

class FilesScreen extends Component<{}, void> {
  static navigationOptions = {
    tabBarLabel: 'Files',
  };

  render() {
    return <Text>FilesScreen</Text>;
  }
}

class AboutScreen extends Component<{}, void> {
  static navigationOptions = {
    tabBarLabel: 'About',
  };

  render() {
    return <Text>AboutScreen</Text>;
  }
}

const SCREENS = {
  News: {
    screen: NewsScreen,
  },
  Members: {
    screen: MembersScreen,
  },
  Files: {
    screen: FilesScreen,
  },
};

export default class TabsPlayground extends Component<{}, void> {
  static navigationOptions = {
    headerTitle: 'Tabs',
  };

  render() {
    const C = TabNavigator(SCREENS);
    return <C />;
  }
}
