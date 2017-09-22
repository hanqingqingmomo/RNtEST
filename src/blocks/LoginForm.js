// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, FormField, TextDeprecated, View } from '../atoms';
import { Form } from '../hoc';

type P = {
  disabled: boolean,
  invalidCredentials: boolean,
  onSubmit: (credentials: { email: string, password: string }) => void,
};

const styles = StyleSheet.create({
  errorText: {
    color: '#E74C3C',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default function LoginForm(props: P) {
  return (
    <Form
      validateOnChange
      getInitialValues={{ email: '', password: '' }}
      rules={{ email: 'required|email', password: 'required' }}
      handleSubmit={(values, formBag) => {
        props.onSubmit(values);
      }}
      render={({ handleSubmit, isValid }) => (
        <View>
          {props.invalidCredentials ? (
            <TextDeprecated style={styles.errorText}>
              Email or password are incorrect.
            </TextDeprecated>
          ) : null}
          <FormField name="email" label="Email" keyboardType="email-address" />
          <FormField name="password" label="Password" secureTextEntry />
        </View>
      )}
    />
  );
}
