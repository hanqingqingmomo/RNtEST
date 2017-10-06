// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Cell as OriginalCell } from 'react-native-tableview-simple';

import { css } from '../../utils/style';

type Props = {
  titleTextStyle?: any,
  titleTextColor?: string,
};

export default class Cell extends Component<Props, void> {
  render() {
    const { titleTextStyle, titleTextColor, ...bag } = this.props;
    return (
      <OriginalCell
        titleTextStyle={[
          styles.titleTextStyle,
          titleTextStyle,
          titleTextColor ? css('color', titleTextColor) : undefined,
        ]}
        {...bag}
      />
    );
  }
}

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: 15,
    color: '#455A64',
  },
});
