// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { View } from '../../atoms';

type Props = {
  value: string,
};

export default class PostEditorContent extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Write content here..."
          placeholderTextColor="#B0BEC5"
          style={styles.input}
          multiline={true}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    minHeight: 300,
    lineHeight: 18,
    fontSize: 14,
  },
});
