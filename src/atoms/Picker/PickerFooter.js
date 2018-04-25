// @flow

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { getColor } from '../../utils/color';

type Props = {
  onCancel: () => mixed,
  onConfirm: () => mixed,
};

type ButtonProps = {
  color: string,
  onPress: () => mixed,
  title: string,
};

function Button(props: ButtonProps) {
  return (
    <TouchableHighlight
      underlayColor="#eee"
      onPress={props.onPress}
      style={{ borderRadius: 5 }}
    >
      <Text
        style={{
          color: props.color,
          padding: 10,
          fontWeight: '500',
          fontSize: 16,
          marginHorizontal: 10,
        }}
      >
        {props.title}
      </Text>
    </TouchableHighlight>
  );
}

export function PickerFooter(props: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ddd',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button color={getColor('gray')} onPress={props.onCancel} title="Close" />
      <Button
        color={getColor('orange')}
        onPress={props.onConfirm}
        title="Done"
      />
    </View>
  );
}
