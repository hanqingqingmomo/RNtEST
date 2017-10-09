// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Form, FormField, TextInput, View, Text } from '../../atoms';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default class FormPlayground extends Component<{}> {
  static navigationOptions = { title: 'Text input & Form fields' };

  handleSubmit = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Text weight="bold" size={18}>
          Text input
        </Text>
        <Text>
          Basic text input component. Component is not connected to parent form
          component in any way. Possible to be used as standalone component.
        </Text>
        <TextInput label="First name" />

        <Text weight="bold" size={18} style={{ marginTop: 50 }}>
          Form field
        </Text>
        <Text>
          Unlike TextInput, FormField is dependent on form state provided by
          parent Form component.
        </Text>
        <Form
          onSubmit={this.handleSubmit}
          rules={{ firstName: 'required|email' }}
          initialValues={{
            firstName: 'John',
            lastName: 'Wick',
          }}
        >
          <View>
            <FormField label="First name" name="firstName" />
            <FormField label="Last name" name="lastName" />
          </View>
        </Form>
      </View>
    );
  }
}
