// @flow

import React from 'react';
import { Alert, Linking, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Text, View } from '../atoms';
import { Avatar } from '../blocks';
import { invalidateSession } from '../redux/ducks/user';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 50,
  },
  name: {
    fontSize: 30,
  },
  email: {
    color: '#999',
    fontSize: 18,
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 50,
  },
});

@connect(null, d => bindActionCreators({ invalidateSession }, d))
export default class UserProfileScreen extends React.Component<*, *, *> {
  static navigationOptions = {
    headerTitle: 'Profile',
  };

  openEmailClient = (address: string) => async () => {
    if (await Linking.canOpenURL(address)) {
      Linking.openURL(address);
    }
  };

  confirmLogout = () => {
    Alert.alert('Confirmation', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: this.props.invalidateSession },
    ]);
  };

  render() {
    const { profile } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Avatar
          style={styles.avatar}
          firstName={profile.firstName}
          lastName={profile.lastName}
        />
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text
          style={styles.email}
          onPress={this.openEmailClient(profile.email)}
        >
          {profile.email}
        </Text>
        <View style={styles.logoutButton}>
          <Button title="Logout" onPress={this.confirmLogout} />
        </View>
      </View>
    );
  }
}
