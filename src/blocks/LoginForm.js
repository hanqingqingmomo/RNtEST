// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Form, FormField, TextDeprecated, View } from '../atoms';

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
      initialValues={{ email: '', password: '' }}
      rules={{ email: 'required|email', password: 'required' }}
      handleSubmit={(values, formBag) => {
        props.onSubmit(values);
      }}
      render={({ handleSubmit, isValid }) => (
        <View>
          <FormField label="Email" name="email" keyboardType="email-address" />
          <FormField label="Password" name="password" secureTextEntry />
        </View>
      )}
    />
  );
}
