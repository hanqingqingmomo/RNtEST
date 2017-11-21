// @flow

import React, { Component } from 'react';
import { Keyboard, NetInfo } from 'react-native';

import { NoContent } from '../blocks';
import { BootScreen } from '../screens';

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
    setTimeout(this.getStatus);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.getStatus);
  }

  componentWillUpdate(nextProps: any, nextState: S) {
    if (nextState.isConnected !== this.state.isConnected) {
      Keyboard.dismiss();
    }
  }

  getStatus = async () => {
    this.setState({
      isConnected: await NetInfo.isConnected.fetch(),
    });
  };

  render() {
    const { isConnected } = this.state;

    if (isConnected === null) {
      return <BootScreen />;
    }

    return isConnected ? (
      this.props.children
    ) : (
      <NoContent
        iconName="offline"
        title="You are offline"
        subtitle="Please connect to the Internet to use the app."
      />
    );
  }
}
