// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title?: string,
  description?: string,
};

export function PickerHeader(props: Props) {
  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        minHeight: 40,
      }}
    >
      {props.title ? (
        <Text
          style={{
            color: '#333',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {props.title}
        </Text>
      ) : null}
      {props.description ? (
        <Text
          style={{
            fontSize: 14,
            marginBottom: 5,
            color: '#666',
          }}
        >
          {props.description}
        </Text>
      ) : null}
    </View>
  );
}
