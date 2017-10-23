// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Form, FormField, Icon, Text, View } from '../../atoms';
import { getColor } from '../../utils/color';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

export type FormValues = typeof INITIAL_VALUES;

type Props = {
  error: boolean,
  loading: boolean,
  handleAuthenticationRequest: (values: FormValues) => *,
  handlePasswordScreenRequest: () => void,
};

const RULES = {
  email: 'required|email',
  password: 'required',
};

const MESSAGES = {
  email: 'Please enter valid email address',
  password: 'Please enter your password',
};

export default class EmailAuthenticationBlock extends Component<Props> {
  render() {
    return (
      <Form
        initialValues={INITIAL_VALUES}
        rules={RULES}
        messages={MESSAGES}
        onSubmit={this.props.handleAuthenticationRequest}
        render={formProps => (
          <View style={styles.container}>
            <Icon
              name="mpwr-logo"
              color="orange"
              size={80}
              style={styles.icon}
            />

            <View style={styles.formWrapper}>
              {this.props.error ? (
                <Text
                  color={getColor('red')}
                  style={styles.authenticationErrorText}
                >
                  Authentication failed. Invalid email and/or password.
                </Text>
              ) : null}

              <FormField
                label="E-mail Address"
                name="email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <FormField label="Password" name="password" secureTextEntry />

              <Text
                color="orange"
                size={16}
                onPress={this.props.handlePasswordScreenRequest}
                style={styles.forgotPasswordText}
              >
                Forgot password?
              </Text>
            </View>
            <Button
              block
              size="lg"
              disabled={this.props.loading}
              color={getColor('orange')}
              textColor={getColor('white')}
              onPress={formProps.handleSubmit}
              title={this.props.loading ? 'Signing In...' : 'Sign In'}
            />
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 275,
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  formWrapper: {
    paddingVertical: 30,
  },
  forgotPasswordText: {
    marginTop: 38,
  },
  authenticationErrorText: {
    position: 'absolute',
    top: -20,
  },
  icon: {
    marginTop: 20,
  },
});
