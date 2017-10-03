// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import {
  AvatarPicker,
  Button,
  Form,
  FormField,
  Icon,
  ScrollView,
  Text,
  View,
} from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type FormDataProps = {
  [string]: string,
};

type Props = {
  handleSubmit: () => void,
};

const RULES = {
  email: 'required|email',
  firstName: 'required',
  lastName: 'required',
  password: 'required',
};

class SignupForm extends React.Component<void, Props, void> {
  static navigationOptions = {
    title: 'SignUp Form',
  };

  render() {
    return (
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
          <AvatarPicker />
        </View>

        <FormField label="First Name" name="firstName" />
        <FormField label="Last Name" name="lastName" />
        <FormField
          label="E-mail Address"
          name="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField label="Password" name="password" />

        <Button
          color={getColor('orange')}
          onPress={this.props.handleSubmit}
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
          By signing up, you agree to our{' '}
          <Text style={styles.specialText} weight="bold" onPress={() => {}}>
            Terms
          </Text>
          {' & '}
          <Text style={styles.specialText} weight="bold" onPress={() => {}}>
            Privacy Policy
          </Text>
        </Text>
      </ScrollView>
    );
  }
}

export default function SignUpScreen() {
  const handleSubmit = (formData: FormDataProps) => {
    console.log(formData);
  };

  return (
    <Form
      render={formProps => <SignupForm handleSubmit={formProps.handleSubmit} />}
      onSubmit={handleSubmit}
      rules={RULES}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    backgroundColor: getColor('white'),
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
