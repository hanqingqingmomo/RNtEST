// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, FormField, View } from '../atoms';
import { Form } from '../hoc';

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
      render={({ handleReset, handleSubmit }) =>
        <View style={styles.container}>
          <FormField name="email" label="Enter your email" />
          <FormField name="facebook" label="facebook username" />
          <FormField name="twitter" label="twitter username" />
          <View style={styles.buttons}>
            <Button title="Reset" appearance="default" onPress={handleReset} />
            <Button
              title="Submit"
              appearance="primary"
              onPress={handleSubmit}
            />
          </View>
        </View>}
    />
  );
}
