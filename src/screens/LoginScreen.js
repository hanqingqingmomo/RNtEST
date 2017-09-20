// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'react-native-config';
console.log(Config);
import { View, Text } from '../atoms';
import { LoginForm } from '../blocks';
import { RequestMonitor } from '../hoc';
import { verifyCredentials } from '../redux/ducks/user';
import { REQUEST_IDS } from '../redux/ducks/requests';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  forgottenPasswordText: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

@connect(null, (d: *) => bindActionCreators({ verifyCredentials }, d))
@RequestMonitor(REQUEST_IDS.VERIFY_CREDENTIALS)
export default class LoginScreen extends React.Component<*, *, *> {
  static navigationOptions = {
    headerTitle: 'Log in',
  };

  pushForgottenPasswordScreen = () => {
    this.props.navigation.navigate('ForgottenPasswordScreen');
  };

  verifyCredentials = (credentials: { email: string, password: string }) => {
    this.props.verifyCredentials(credentials.email, credentials.password);
  };

  render() {
    const { requestIsRunning, requestError } = this.props;
    return (
      <View contentContainerStyle={styles.contentContainer}>
        <Text
          style={styles.forgottenPasswordText}
          onPress={this.pushForgottenPasswordScreen}
        >
          Forgotten password?
          {JSON.stringify(Config)}
        </Text>
      </View>
    );
  }
}
