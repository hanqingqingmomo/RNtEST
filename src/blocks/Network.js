// @flow

import React, { Component } from 'react';
import { Animated, Keyboard, NetInfo, StyleSheet } from 'react-native';

import { NoContent } from '../blocks';

const INITIAL_OPACITY = 0;

type S = {
  animationFinished: boolean,
  isConnected: boolean,
};

export default class Network extends Component<{}, S> {
  state = {
    animationFinished: true,
    isConnected: true,
  };

  animOpacity = new Animated.Value(INITIAL_OPACITY);

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.getStatus);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.getStatus);
  }

  componentWillUpdate(nextProps: any, nextState: S) {
    if (nextState.isConnected !== this.state.isConnected) {
      Keyboard.dismiss();

      nextState.animationFinished = false;

      Animated.timing(this.animOpacity, {
        toValue: nextState.isConnected ? INITIAL_OPACITY : 1,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ animationFinished: true });
      });
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
    const { animationFinished, isConnected } = this.state;
    return isConnected && animationFinished ? null : (
      <Animated.View
        pointerEvents={isConnected ? 'none' : undefined}
        style={[
          StyleSheet.absoluteFillObject,
          { opacity: this.animOpacity, backgroundColor: 'white' },
        ]}
      >
        <NoContent
          iconName="offline"
          title="You are offline"
          subtitle="Please connect to the Internet to use the app."
        />
      </Animated.View>
    );
  }
}
