// @flow

import React, { Component } from 'react';

import { WebView } from 'react-native';

type Props = {
  navigation: any,
};

export default class WebViewScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
  });

  render() {
    return (
      <WebView source={{ uri: this.props.navigation.state.params.webURL }} />
    );
  }
}
