// @flow

import React, { Component } from 'react';

import { WebView } from 'react-native';

type Props = {
  navigation: any,
};

export default class WebViewScreen extends Component<Props> {
  render() {
    return (
      <WebView source={{ uri: this.props.navigation.state.params.webURL }} />
    );
  }
}
