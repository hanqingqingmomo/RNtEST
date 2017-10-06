// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  AvatarPicker,
  Button,
  Form,
  FormField,
  Icon,
  ScrollView,
  Spacer,
  Text,
  View,
} from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  avatarImageUri: '',
};

const RULES = {
  email: 'required|email',
  firstName: 'required',
  lastName: 'required',
  password: 'required',
};

type FormValues = typeof INITIAL_VALUES;

type State = {
  avatarImageUri: ?string,
};

export default class EmailRegistrationScreen extends Component<{}, State> {
  state = {
    avatarImageUri: null,
  };

  handleSubmit = (values: FormValues) => {
    alert(JSON.stringify(values));
  };

  onAvatarChange = (avatarImageUri: string) => {
    this.setState({ avatarImageUri });
  };

  render() {
    return (
      <Form
        initialValues={INITIAL_VALUES}
        onSubmit={this.handleSubmit}
        rules={RULES}
        render={form => (
          <ScrollView style={styles.container}>
            <Icon name="ywca" color={getColor('orange')} size={100} />

            <Text
              style={[styles.addText, css('color', getColor('gray'))]}
              size={17}
              lineHeight={20}
            >
              Add Photo
            </Text>

            <View style={styles.picker}>
              <AvatarPicker
                imageUri={this.state.avatarImageUri}
                onChange={this.onAvatarChange}
              />
            </View>

            <View flexDirection="row">
              <View flexGrow={1}>
                <FormField label="First Name" name="firstName" />
              </View>
              <Spacer width={10} />

              <View flexGrow={1}>
                <FormField label="Last Name" name="lastName" />
              </View>
            </View>
            <FormField
              label="E-mail Address"
              name="email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormField label="Password" name="password" />

            <Button
              block
              color={getColor('orange')}
              onPress={form.handleSubmit}
              size="lg"
              style={styles.button}
              textColor={getColor('white')}
              title="Sign Up"
            />

            <Text
              size={13}
              lineHeight={20}
              style={[css('color', getColor('gray')), styles.policyText]}
            >
              {'By signing up, you agree to our '}
              <Text style={styles.specialText} weight="bold" onPress={() => {}}>
                Terms
              </Text>
              {' & '}
              <Text style={styles.specialText} weight="bold" onPress={() => {}}>
                Privacy Policy
              </Text>
            </Text>
          </ScrollView>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
  },
  addText: {
    marginBottom: 15,
  },
  button: {
    marginTop: 25,
  },
  picker: {
    marginBottom: 5,
  },
  policyText: {
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
  specialText: {
    textDecorationLine: 'underline',
  },
});
