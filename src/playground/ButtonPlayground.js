// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, View } from '../atoms';

export default class ButtonPlayground extends React.Component<*, *, *> {
  static navigationOptions = {
    title: 'Icon Buttons',
  };

  render() {
    return (
      <View>
        <View style={[styles.container, styles.darkBackground]}>
          <Button.Icon
            color="rgba(255,23,68,1)"
            iconColor="white"
            iconName="attachment"
            onPress={() => {}}
            size="lg"
            style={[styles.shadow, styles.marginTop]}
          />
          <Button.Icon
            color="white"
            iconColor="white"
            iconName="call-1"
            onPress={() => {}}
            outline
            size="md"
            style={[styles.marginTop]}
          />
          <Button.Icon
            color="white"
            iconColor="rgba(31,51,61,1)"
            iconName="close"
            onPress={() => {}}
            size="xs"
            style={[styles.marginTop]}
          />
        </View>
        <View style={[styles.container, styles.whiteBackground]}>
          <Button.Icon
            color="rgba(176,190,197,1)"
            iconColor="white"
            iconName="like"
            onPress={() => {}}
            size="lg"
            style={[styles.marginTop]}
          />
          <Button.Icon
            color="rgba(0,230,118,1)"
            iconColor="white"
            iconName="like"
            onPress={() => {}}
            size="lg"
            style={[styles.marginTop]}
          />
          <Button
            color="rgba(0,230,118,1)"
            onPress={() => {}}
            size="lg"
            style={[styles.marginTop]}
            textColor="white"
            title="Join now!"
          />
          <Button
            color="rgba(0,230,118,1)"
            onPress={() => {}}
            outline
            size="lg"
            style={[styles.marginTop]}
            textColor="rgba(0,230,118,1)"
            title="Join now!"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    padding: 12,
  },
  darkBackground: {
    backgroundColor: 'rgba(31,51,61,1)',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  marginTop: {
    marginTop: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
