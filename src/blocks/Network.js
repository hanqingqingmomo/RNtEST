// @flow

import React, { Component } from 'react';
import { Animated, Keyboard, NetInfo, StyleSheet } from 'react-native';

import { NoContent } from '../blocks';

const INITIAL_OPACITY = 0;

type P = {
  children: React$Node,
};

type S = {
  isConnected: ?boolean,
};

export default class Network extends Component<P, S> {
  state = {
    isConnected: null,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.getStatus);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.getStatus);
  }

  componentWillUpdate(nextProps: any, nextState: S) {
    if (nextState.isConnected !== this.state.isConnected) {
      Keyboard.dismiss();
    }
  }

  toggle = () => {
    this.setState({ isConnected: !this.state.isConnected });
  };

  getStatus = async () => {
    this.setState({
      isConnected: await NetInfo.isConnected.fetch(),
    });
  };

  render() {
    const { isConnected } = this.state;

    return isConnected === true ? (
      this.props.children
    ) : isConnected === false ? (
      <NoContent
        iconName="offline"
        title="You are offline"
        subtitle="Please connect to the Internet to use the app."
      />
    ) : null;
  }
}
