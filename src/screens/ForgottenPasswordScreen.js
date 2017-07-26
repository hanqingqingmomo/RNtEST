// @flow

import React from 'react';

import { CenterView, Text } from '../atoms';

export default class ForgottenPasswordScreen extends React.Component<*, *, *> {
  static navigationOptions = {
    headerTitle: 'Password recovery',
  };

  render() {
    return (
      <CenterView>
        <Text>Password reset instructions</Text>
      </CenterView>
    );
  }
}
