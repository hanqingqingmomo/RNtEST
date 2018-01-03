// @flow

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { type Style } from '../Types';
import { css } from '../utils/style';

type Props = {
  children?: React$Node,
  containerStyle?: Style,
  fill?: boolean,
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | boolean,
  scrollEnabled: boolean,
  style?: Style,
  tintColor?: string,
};

export default class Screen extends React.Component<Props> {
  static defaultProps = {
    scrollEnabled: true,
  };

  render(): React$Node {
    const {
      children,
      containerStyle,
      fill,
      keyboardShouldPersistTaps,
      style,
      tintColor,
    } = this.props;

    const C = this.props.scrollEnabled ? ScrollView : View;
    const passProps = {};

    if (this.props.scrollEnabled) {
      passProps.keyboardShouldPersistTaps =
        keyboardShouldPersistTaps || 'never';
      passProps.alwaysBounceVertical = false;
      passProps.overScrollMode = 'auto';
      passProps.contentContainerStyle = [
        fill ? styles.fillContentView : undefined,
        containerStyle,
      ];
    }

    return (
      <C
        {...passProps}
        style={[
          { flex: 1 },
          tintColor ? css('backgroundColor', tintColor) : undefined,
          style,
        ]}
      >
        {children}
      </C>
    );
  }
}
const styles = StyleSheet.create({
  fillContentView: {
    minHeight: '100%',
  },
});
