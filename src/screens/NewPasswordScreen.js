// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { makeNewPasswordReq } from '../utils/requestFactory';
import {
  Button,
  DropdownAlert,
  Fetch,
  Form,
  FormField,
  Screen,
  View,
} from '../atoms';
import { type AlertPayload } from '../atoms/DropdownAlert';
import { getColor } from '../utils/color';

const INITIAL_VALUES = {
  password: '',
  confirm_password: '',
};

type FormValues = typeof INITIAL_VALUES;

const RULES = {
  password: 'required',
  confirm_password: 'required',
};

const MESSAGES = {
  password: 'Please enter password',
  confirm_password: 'Please enter password',
};

export default class NewPasswordScreen extends Component<{}> {
  dropdown = null;

  handleFormSubmit = fetch => async (values: FormValues) => {
    if (values.password != values.confirm_password) {
      if (this.dropdown) {
        this.dropdown.alertWithType('error', 'Ooops', 'Passwords must match');
      }
      return;
    }

    const newPasswordReq = makeNewPasswordReq(values.password);
    const newPasswordRes = await fetch(
      newPasswordReq.url,
      newPasswordReq.options
    );

    if (newPasswordRes.error) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'error',
          'Ooops',
          (newPasswordRes.error.message: string)
        );
      }
    } else if (this.dropdown) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'success',
          'Success!',
          'Your password has been successfully changed.'
        );
      }
    }
  };

  onAlertClose = (data: AlertPayload) => {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <Screen fill>
        <View style={styles.container}>
          <Fetch manual>
            {({ loading, data, error, fetch }) => (
              <Form
                initialValues={INITIAL_VALUES}
                rules={RULES}
                messages={MESSAGES}
                onSubmit={this.handleFormSubmit(fetch)}
                render={formProps => (
                  <View flexDirection="column" style={styles.formContainer}>
                    <FormField
                      label="New Password"
                      name="password"
                      secureTextEntry
                    />
                    <FormField
                      label="Confirm password"
                      name="confirm_password"
                      secureTextEntry
                    />
                    <Button
                      block
                      disabled={loading === true}
                      size="lg"
                      style={styles.button}
                      color={getColor('orange')}
                      textColor={getColor('white')}
                      onPress={formProps.handleSubmit}
                      title={loading ? 'Changing...' : 'Change'}
                    />
                  </View>
                )}
              />
            )}
          </Fetch>
        </View>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={this.onAlertClose}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    width: 275,
    paddingBottom: 40,
  },

  button: {
    marginTop: 15,
  },
});
