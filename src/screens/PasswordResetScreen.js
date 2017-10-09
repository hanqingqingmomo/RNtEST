// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Form, FormField, Icon, Screen, View } from '../atoms';
import { getColor } from '../utils/color';

const INITIAL_VALUES = {
  email: '',
};

type FormValues = typeof INITIAL_VALUES;

const RULES = {
  email: 'required|email',
};

export default class PasswordResetScreen extends Component<{}, void> {
  handleFormSubmit = (values: FormValues) => {
    alert(JSON.stringify(values));
  };

  render() {
    return (
      <Screen fill>
        <Form
          initialValues={INITIAL_VALUES}
          rules={RULES}
          onSubmit={this.handleFormSubmit}
          render={formProps => (
            <View flexDirection="column" style={styles.container}>
              <Icon name="ywca" color="orange" size={100} />
              <FormField
                label="E-mail Address"
                name="email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Button
                block
                size="lg"
                color={getColor('orange')}
                textColor={getColor('white')}
                onPress={formProps.handleSubmit}
                title="Request new Password"
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
});
