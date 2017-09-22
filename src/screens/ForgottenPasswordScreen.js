// @flow

import React from 'react';

import { CenterView, TextDeprecated } from '../atoms';

export default class ForgottenPasswordScreen extends React.Component<*, *, *> {
  static navigationOptions = {
    headerTitle: 'Password recovery',
  };

  render() {
    return (
      <CenterView>
        <TextDeprecated>Password reset instructions</TextDeprecated>
      </CenterView>
    );
  }
}
