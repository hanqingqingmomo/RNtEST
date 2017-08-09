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
export default class UseruserScreen extends React.Component<*, *, *> {
  static navigationOptions = props => ({
    headerTitle: 'Welcome',
    headerRight: (
      <Button
        title="Profile"
        appearance="default"
        onPress={() =>
          props.navigation.navigate('UserProfileScreen', {
            profile: props.screenProps.user,
          })}
      />
    ),
  });

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
    const { user } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <Avatar
          style={styles.avatar}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.email} onPress={this.openEmailClient(user.email)}>
          {user.email}
        </Text>

        <Button
          title="Log out"
          appearance="primary"
          onPress={this.confirmLogout}
          style={styles.logoutButton}
        />
      </View>
    );
  }
}
