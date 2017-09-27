// @flow

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { css } from '../../utils/style';

type P = {
  placeholder?: string,
  size: 'lg' | 'md' | 'sm',
  onChangeText: string => void,
  value: string,
};

export default class DonationInput extends React.Component<*, P, *> {
  onChangeText = (value: string) => {
    this.props.onChangeText(value);
  };

  render() {
    const { placeholder, size, value } = this.props;

    return (
      <TextInput
        placeholder={placeholder}
        style={[styles[size], styles.container, css('color', 'orange')]}
        keyboardType="numeric"
        placeholderTextColor="#455A64"
        value={value}
        maxLength={10}
        onChangeText={this.onChangeText}
        underlineColorAndroid="transparent"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 18,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#B0BEC5',
    borderRadius: 3,
  },
  sm: {
    height: 41,
    fontSize: 14,
  },
  md: {
    height: 48,
    fontSize: 19,
  },
  lg: {
    height: 57,
    fontSize: 18,
  },
});
