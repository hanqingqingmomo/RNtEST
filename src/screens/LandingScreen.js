// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Icon, View } from '../atoms';
import { getColor } from '../utils/color';

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    title: 'Landing Screen',
  };

  onGetStarted = () => {
    console.log('started');
  };

  onInviteCode = () => {
    console.log('invite');
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.icon}>
          <Icon name="ywca" color="white" size={150} />
        </View>
        <View style={styles.viewContainer}>
          <Button
            color={getColor('white')}
            onPress={this.onGetStarted}
            size="lg"
            style={styles.marginBottom}
            textColor={getColor('orange')}
            title="Get Started"
          />
          <Button
            color={getColor('white')}
            onPress={this.onInviteCode}
            outline
            size="lg"
            textColor={getColor('white')}
            title="Invite Code"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: getColor('orange'),
    flex: 1,
  },
  marginBottom: {
    marginBottom: 15,
  },
  viewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  icon: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
