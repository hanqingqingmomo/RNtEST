// @flow

import React, { Component } from 'react';
import { Animated, Keyboard, NetInfo, StyleSheet } from 'react-native';

import { Text } from '../atoms';

const INITIAL_OPACITY = 0;

type S = {
  animationFinished: boolean,
  isConnected: boolean,
};

const styles = StyleSheet.create({
  fill: {
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

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
          styles.fill,
          { opacity: this.animOpacity },
        ]}
      >
        <Text size={40} color="white" style={styles.text}>
          Offline
        </Text>
      </Animated.View>
    );
  }
}
