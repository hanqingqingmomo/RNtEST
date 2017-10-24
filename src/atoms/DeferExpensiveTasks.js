// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';

import { ActivityIndicator, CenterView } from './index';

type Props = {
  children: React$Node,
};

type State = {
  ready: boolean,
};

export default class DeferExpensiveTasks extends Component<Props, State> {
  state = {
    ready: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ ready: true });
    });
  }

  render() {
    return this.state.ready === false ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
      this.props.children
    );
  }
}
