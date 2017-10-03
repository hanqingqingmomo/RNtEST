// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Text, RequestMonitor } from '../atoms';
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
    return (
      <View contentContainerStyle={styles.contentContainer}>
        <View style={{ padding: 10 }}>
          <Text size={16}>Abc</Text>
        </View>
      </View>
    );
  }
}
