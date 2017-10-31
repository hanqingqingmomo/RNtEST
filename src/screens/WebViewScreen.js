// @flow

import React, { Component } from 'react';
import { WebView } from 'react-native';

import type { ScreenProps } from '../Types';

type NavigationState = {
  params: {
    title: string,
    webURL: string,
  },
};

type Props = ScreenProps<NavigationState>;

export default class WebViewScreen extends Component<Props> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerTitle: navigation.state.params.title,
  });

  render() {
    return (
      <WebView source={{ uri: this.props.navigation.state.params.webURL }} />
    );
  }
}
