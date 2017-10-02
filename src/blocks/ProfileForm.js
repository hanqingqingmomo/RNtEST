// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Form, FormField, View } from '../atoms';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
});

export default function ProfileForm() {
  return (
    <Form
      validateOnChange
      handleSubmit={(values, formBag) => {
        alert(JSON.stringify(values));
      }}
      render={({ handleReset, handleSubmit }) => (
        <View style={styles.container}>
          <FormField name="email" label="Enter your email" />
          <FormField name="facebook" label="Facebook username" />
          <FormField name="twitter" label="Twitter username" />
          <View style={styles.buttons} />
        </View>
      )}
    />
  );
}
