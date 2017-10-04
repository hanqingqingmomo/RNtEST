// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Form, FormField, Icon, Text, View, Screen } from '../atoms';
import { getColor } from '../utils/color';

const INITIAL_FORM_STATE = {
  email: '',
};

type FormState = typeof INITIAL_FORM_STATE;

const RULES = {
  email: 'required|email',
};

export default class PasswordResetScreen extends React.Component {
  handleFormSubmit = (values: FormState) => {
    alert(JSON.stringify(values));
  };

  render() {
    return (
      <Screen tintColor="white">
        <Form
          initialValues={INITIAL_FORM_STATE}
          rules={RULES}
          onSubmit={this.handleFormSubmit}
          render={formProps => (
            <View style={styles.container}>
              <Icon name="ywca" color="orange" size={100} />
              <FormField
                label="E-mail Address"
                name="email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Button
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
