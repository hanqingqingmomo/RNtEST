// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../atoms';

type P = {
  style: any,
  firstName: string,
  lastName: string,
};

const WIDTH = 150;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E74C3C',
    width: WIDTH,
    height: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WIDTH / 2,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default function Avatar(props: P) {
  return (
    <View {...props} style={[props.style, styles.container]}>
      <Text style={styles.text}>
        {props.firstName[0]}
        {props.lastName[0]}
      </Text>
    </View>
  );
}
