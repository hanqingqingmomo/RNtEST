// @flow

import React from 'react';
import { Alert, Linking, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, TextDeprecated, View } from '../atoms';
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
        <TextDeprecated style={styles.name}>
          {user.firstName} {user.lastName}
        </TextDeprecated>
        <TextDeprecated
          style={styles.email}
          onPress={this.openEmailClient(user.email)}
        >
          {user.email}
        </TextDeprecated>
        <Button
          color="rgba(59,89,152,1)"
          onPress={this.confirmLogout}
          outline
          size="lg"
          style={styles.logoutButton}
          textColor="rgba(59,89,152,1)"
          title="Sign Up!"
        />
      </View>
    );
  }
}
