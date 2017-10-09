// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Form, FormField, Icon, View, Screen } from '../atoms';
import { getColor } from '../utils/color';

const INITIAL_VALUES = {
  invitationCode: '',
};

type FormValues = typeof INITIAL_VALUES;

const RULES = {
  invitationCode: 'required|min:6',
};

export default class InvitationCodeScreen extends Component<{}> {
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
            <View style={styles.container}>
              <Icon name="ywca" color="orange" size={100} />
              <FormField
                label="Invitation code"
                name="invitationCode"
                autoCapitalize="none"
              />
              <Button
                block
                size="lg"
                color={getColor('orange')}
                textColor={getColor('white')}
                onPress={formProps.handleSubmit}
                title="Join"
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
