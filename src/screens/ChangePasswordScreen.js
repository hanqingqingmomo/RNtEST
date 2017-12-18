// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { makeChangePasswordReq } from '../utils/requestFactory';
import {
  Button,
  DropdownAlert,
  Fetch,
  Form,
  FormField,
  Screen,
  View,
} from '../atoms';
import { type AlertPayload } from '../atoms/react-native-dropdownalert';
import { getColor } from '../utils/color';
import type { ScreenProps, FetchProps } from '../Types';

const INITIAL_VALUES = {
  password: '',
  confirmPassword: '',
};

type FormValues = typeof INITIAL_VALUES;

type P = ScreenProps<*>;

const RULES = {
  password: 'required',
  confirmPassword: 'required',
};

const MESSAGES = {
  password: 'Please enter new password',
  confirmPassword: 'Please confirm your password',
};

export default class ChangePasswordScreen extends Component<P> {
  dropdownRef = null;

  handleFormSubmit = (fetch: Function) => async (values: FormValues) => {
    if (values.password !== values.confirmPassword) {
      if (this.dropdownRef) {
        this.dropdownRef.alertWithType(
          'error',
          'Ooops',
          'Passwords must match'
        );
      }
      return;
    }

    const changePasswordReq = makeChangePasswordReq(values.password);

    const changePasswordRes = await fetch(
      changePasswordReq.url,
      changePasswordReq.options
    );

    if (changePasswordRes.error) {
      if (this.dropdownRef) {
        this.dropdownRef.alertWithType(
          'error',
          'Ooops',
          changePasswordRes.error.message
        );
      }
    } else if (this.dropdownRef) {
      if (this.dropdownRef) {
        this.dropdownRef.alertWithType(
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
            {({ loading, fetch }: FetchProps<*>) => (
              <Form
                initialValues={INITIAL_VALUES}
                rules={RULES}
                messages={MESSAGES}
                onSubmit={this.handleFormSubmit(fetch)}
                render={(formProps: { handleSubmit: Function }) => (
                  <View flexDirection="column" style={styles.formContainer}>
                    <FormField
                      label="New Password"
                      name="password"
                      secureTextEntry
                    />
                    <FormField
                      label="Confirm password"
                      name="confirmPassword"
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
          ref={ref => (this.dropdownRef = ref)}
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
