// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withState } from 'recompose';

import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from '../atoms';
import { RequestMonitor } from '../hoc';
import { verifyCredentials } from '../redux/ducks/user';
import { REQUEST_IDS, type RequestError } from '../redux/ducks/requests';
import { type ScreenProps } from '../Types';

type P = ScreenProps<*> & {
  email: string,
  password: string,
  setEmail: Function,
  setPassword: Function,
  verifyCredentials: Function,
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderBottomColor: Platform.select({ ios: '#ccc' }),
    borderBottomWidth: Platform.select({ ios: StyleSheet.hairlineWidth }),
  },
  button: {
    marginVertical: 20,
  },
  errorText: {
    color: '#E74C3C',
    alignSelf: 'center',
    marginBottom: 20,
  },
  forgottenPasswordText: {
    alignSelf: 'center',
  },
});

@connect(null, d => bindActionCreators({ verifyCredentials }, d))
@withState('email', 'setEmail', '')
@withState('password', 'setPassword', '')
export default class LoginScreen extends React.Component<*, P, *> {
  static navigationOptions = {
    headerTitle: 'Log in',
  };

  verifyCredentials = () => {
    this.props.verifyCredentials(this.props.email, this.props.password);
  };

  pushForgottenPasswordScreen = () => {
    this.props.navigation.navigate('ForgottenPasswordScreen');
  };

  render() {
    return (
      <RequestMonitor requestId={REQUEST_IDS.VERIFY_CREDENTIALS} render>
        {({
          requestIsRunning,
          requestError,
        }: {
          requestIsRunning: boolean,
          requestError: RequestError,
        }) => {
          return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              {requestError
                ? <Text style={styles.errorText}>
                    Email or password are incorrect.
                  </Text>
                : null}
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                keyboardType="email-address"
                style={styles.textInput}
                onChangeText={this.props.setEmail}
                value={this.props.email}
              />
              <TextInput
                secureTextEntry
                placeholder="Password"
                style={styles.textInput}
                onChangeText={this.props.setPassword}
                value={this.props.password}
              />
              <Button
                title="Log in"
                appearance="primary"
                onPress={this.verifyCredentials}
                style={styles.button}
                buttonRight={
                  requestIsRunning ? <ActivityIndicator color="white" /> : null
                }
              />
              <TouchableOpacity onPress={this.pushForgottenPasswordScreen}>
                <Text style={styles.forgottenPasswordText}>
                  Forgotten password
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      </RequestMonitor>
    );
  }
}

LoginScreen.navigationOptions = {
  headerTitle: 'Log in',
};
