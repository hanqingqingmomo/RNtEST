// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Form, FormField, Icon, Text, View, Screen } from '../atoms';
import { getColor } from '../utils/color';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

type FormValues = typeof INITIAL_VALUES;

const RULES = {
  email: 'required|email',
  password: 'required',
};

export default class PasswordResetScreen extends React.Component {
  navigateToPasswordResetScreen = () => {
    this.props.navigation.navigate('PasswordResetScreen');
  };

  handleFormSubmit = (values: FormValues) => {
    alert(JSON.stringify(values));
  };

  render() {
    return (
      <Screen>
        <Form
          initialValues={INITIAL_VALUES}
          rules={RULES}
          onSubmit={this.handleFormSubmit}
          render={formProps => (
            <View style={styles.container}>
              <Icon name="ywca" color="orange" size={100} />
              <View style={styles.formWrapper}>
                <FormField
                  label="E-mail Address"
                  name="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <FormField label="Password" name="password" secureTextEntry />

                <Text
                  color="orange"
                  size={16}
                  onPress={this.navigateToPasswordResetScreen}
                  style={styles.forgotPasswordText}
                >
                  Forgot password?
                </Text>
              </View>
              <Button
                size="lg"
                color={getColor('orange')}
                textColor={getColor('white')}
                onPress={formProps.handleSubmit}
                title="Sign Up"
              />
            </View>
          )}
        />
      </Screen>
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
});
