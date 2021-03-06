// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { makePasswordResetReq } from '../utils/requestFactory';
import {
  Button,
  DropdownAlert,
  Fetch,
  Form,
  FormField,
  Icon,
  Screen,
  View,
} from '../atoms';
import { type AlertPayload } from '../atoms/react-native-dropdownalert';
import { getColor } from '../utils/color';
import type { ScreenProps, FetchProps } from '../Types';

type FormValues = typeof INITIAL_VALUES;

type Props = ScreenProps<*>;

const INITIAL_VALUES = {
  email: '',
};

const RULES = {
  email: 'required|email',
};

const MESSAGES = {
  email: 'Please enter valid email address',
};

export default class PasswordResetScreen extends Component<Props> {
  static navigationOptions = {
    headerTitle: 'Password Reset',
  };

  // TODO use global instance of dropdown
  dropdown: any = null;

  handleFormSubmit = (fetch: Function) => async (values: FormValues) => {
    const passwordResetReq = makePasswordResetReq(values.email);
    const passwordResetRes = await fetch(
      passwordResetReq.url,
      passwordResetReq.options
    );

    if (passwordResetRes.error) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'error',
          'Ooops',
          (passwordResetRes.error.message: string)
        );
      }
    } else if (this.dropdown) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'success',
          'Thanks!',
          'Please check your email for a link to reset your password.'
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
        <Fetch manual>
          {({ loading, fetch }: FetchProps<*>) => (
            <Form
              initialValues={INITIAL_VALUES}
              rules={RULES}
              messages={MESSAGES}
              onSubmit={this.handleFormSubmit(fetch)}
              render={formProps => (
                <View flexDirection="column" style={styles.container}>
                  <Icon
                    color="orange"
                    name="mpwr-logo"
                    size={64}
                    style={styles.icon}
                  />
                  <FormField
                    label="E-mail Address"
                    name="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Button
                    block
                    disabled={loading === true}
                    size="lg"
                    color={getColor('orange')}
                    textColor={getColor('white')}
                    onPress={formProps.handleSubmit}
                    title={
                      loading
                        ? 'Sending reset email...'
                        : 'Request new Password'
                    }
                  />
                </View>
              )}
            />
          )}
        </Fetch>
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
    width: 275,
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  icon: {
    marginVertical: 20,
  },
});
