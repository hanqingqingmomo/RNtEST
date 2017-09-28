// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../atoms';
import { UserProfile } from '../blocks';

const data = {
  imageURI:
    'https://www.thedealersden.com/uploads/cache/img_A_117518_89f3552911d13156e3164f3e11351a6f-500x500.jpg',
  username: 'Carla Anthony',
  position: 'Academy Leader',
  email: 'carla.anthony@ywca.com',
  phone: '0918053935',
};

export default class UserProfilePlayground extends React.Component<*, *, *> {
  static navigationOptions = {
    title: 'User Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <UserProfile {...data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(236, 239, 241, 0.6)',
    flex: 1,
  },
});
