// @flow

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Icon, View } from './index';
import { getColor } from '../utils/color';

type Props = {
  onChangeText: string => void,
  placeholder: string,
  value: string,
};

export default function SearchBox({ onChangeText, placeholder, value }: Props) {
  return (
    <View style={styles.container}>
      <Icon name="search" color="#B0BEC5" size={16} style={styles.icon} />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        style={styles.input}
        underlineColorAndroid="transparent"
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaebec',
    borderRadius: 30 / 2,
    height: 30,
    flexDirection: 'row',
    paddingLeft: 15,
    overflow: 'hidden',
  },
  icon: {
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    color: getColor('gray'),
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
    paddingLeft: 7,
  },
});
