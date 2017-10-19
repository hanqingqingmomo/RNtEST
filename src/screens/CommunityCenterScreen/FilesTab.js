// @flow

import React, { Component } from 'react';

import { Text } from '../../atoms';

export default class FilesTab extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'Files',
  };

  render() {
    return <Text>Files</Text>;
  }
}
