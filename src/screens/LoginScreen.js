// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withState } from 'recompose';

import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from '../atoms';
import { verifyCredentials } from '../redux/ducks/user';
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
  forgottenPasswordText: {
    alignSelf: 'center',
  },
});

@connect(undefined, d => bindActionCreators({ verifyCredentials }, d))
@withState('email', 'setEmail', '')
@withState('password', 'setPassword', '')
export default class LoginScreen extends React.Component<*, P, *> {
  static navigationOptions = {
    headerTitle: 'Login',
  };

  verifyCredentials = () => {
    this.props.verifyCredentials(this.props.email, this.props.password);
  };

  pushForgottenPasswordScreen = () => {
    this.props.navigation.navigate('ForgottenPasswordScreen');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          autoFocus
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
        <View style={styles.button}>
          <Button
            title="Log in"
            appearance="primary"
            onPress={this.verifyCredentials}
          />
        </View>
        <TouchableOpacity onPress={this.pushForgottenPasswordScreen}>
          <Text style={styles.forgottenPasswordText}>Forgotten password</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

LoginScreen.navigationOptions = {
  headerTitle: 'Log in',
};
