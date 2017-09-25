// @flow

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { View } from './index';

type Props = {
  onChangeText: string => void,
  placeholder: string,
  value: string,
};

const Icon = ({ style }) => (
  <View
    style={[
      style,
      {
        backgroundColor: '#90A4AE',
        height: 14,
        width: 14,
      },
    ]}
  />
);

export default function SearchBox({ onChangeText, placeholder, value }: Props) {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} />
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
    borderColor: '#ECEFF1',
    backgroundColor: '#ECEFF1',
    borderWidth: 1,
    borderRadius: 100,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  icon: {
    marginLeft: 10,
  },

  input: {
    flex: 1,
    color: '#90A4AE',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    paddingLeft: 10,
  },
});
