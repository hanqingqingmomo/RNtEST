// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { TextInput, View, Text } from '../atoms';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default class FormPlayground extends React.Component {
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
        <Formik onSubmit={this.handleSubmit}>
          <TextInput label="First name" name="firstName" />
        </Formik>
      </View>
    );
  }
}
