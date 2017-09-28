// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Button } from '../atoms';
import { getColor } from '../utils/color';

const Icon = ({ style }) => (
  <View
    style={[
      style,
      {
        backgroundColor: getColor('white'),
        height: 45,
        width: 150,
      },
    ]}
  />
);

type Props = {
  onDownButtonPress: Function,
  onUpButtonPress: Function,
};

export default function LandingScreen({
  onDownButtonPress,
  onUpButtonPress,
}: Props) {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.viewContainer}>
        <Icon />
      </View>
      <View style={styles.viewContainer}>
        <Button
          color={getColor('white')}
          onPress={onUpButtonPress}
          outline
          size="lg"
          style={styles.upButtonStyle}
          textColor={getColor('orange')}
          title="Get Started"
        />
        <Button
          color={getColor('white')}
          onPress={onDownButtonPress}
          outline
          size="lg"
          style={styles.downButtonStyle}
          textColor={getColor('white')}
          title="Invite Code"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  downButtonStyle: {
    marginBottom: 25,
  },

  screenContainer: {
    backgroundColor: getColor('orange'),
    flex: 1,
    flexDirection: 'column',
  },

  upButtonStyle: {
    marginBottom: 15,
    backgroundColor: getColor('white'),
  },

  viewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
