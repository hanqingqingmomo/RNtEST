// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  AvatarPicker,
  Button,
  Fetch,
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
import {
  makeSignupRq,
  makeSigninRq,
  makeReadProfileRq,
} from '../utils/requestFactory';
import { setUserAccessToken, setUserProfile } from '../redux/ducks/application';

const INITIAL_VALUES = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  photo: null,
};

const RULES = {
  email: 'required|email',
  first_name: 'required',
  last_name: 'required',
  password: 'required',
};

type FormValues = typeof INITIAL_VALUES;

class EmailRegistrationScreen extends Component<{}> {
  handleSubmit = fetch => async (values: FormValues) => {
    const signupReq = makeSignupRq(values);
    const signupRes = await fetch(signupReq.url, signupReq.options);

    if (signupRes.response.ok) {
      const { email, password } = values;
      const signinReq = makeSigninRq({ email, password });
      const signinRes = await fetch(signinReq.url, signinReq.options);
      this.props.setUserAccessToken(signinRes.data.mobile_token);

      const readProfileReq = makeReadProfileRq('me');
      const readProfileRes = await fetch(
        readProfileReq.url,
        readProfileReq.options
      );

      this.props.setUserProfile(readProfileRes.data);
    }
  };

  onAvatarChange = (setFielValue: (string, any) => void) => (photo: string) => {
    setFielValue('photo', photo);
  };

  onPasswordChange = (setFielValue: (name: string, value: string) => void) => (
    password: string
  ) => {
    setFielValue('password_confirmation', password);
  };

  render() {
    return (
      <Fetch manual>
        {({ loading, data, fetch, error }) => (
          <Form
            initialValues={INITIAL_VALUES}
            onSubmit={this.handleSubmit(fetch)}
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
                    imageURI={form.values.photo}
                    onChange={this.onAvatarChange(form.setFieldValue)}
                  />
                </View>

                <View flexDirection="row">
                  <View flexGrow={1}>
                    <FormField label="First Name" name="first_name" />
                  </View>
                  <Spacer width={10} />

                  <View flexGrow={1}>
                    <FormField label="Last Name" name="last_name" />
                  </View>
                </View>
                <FormField
                  label="E-mail Address"
                  name="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <FormField
                  label="Password"
                  name="password"
                  secureTextEntry
                  onChangeText={this.onPasswordChange(form.setFieldValue)}
                />

                {loading === false && error ? (
                  <Text color={getColor('red')}>
                    {'\n'}Registration failed. Check provided information.
                  </Text>
                ) : null}

                <Button
                  block
                  disabled={loading}
                  color={getColor('orange')}
                  onPress={form.handleSubmit}
                  size="lg"
                  style={styles.button}
                  textColor={getColor('white')}
                  title={loading ? 'Signing Up...' : 'Sign Up'}
                />

                <Text
                  size={13}
                  lineHeight={20}
                  style={[css('color', getColor('gray')), styles.policyText]}
                >
                  {'By signing up, you agree to our '}
                  <Text
                    style={styles.specialText}
                    weight="bold"
                    onPress={() => {}}
                  >
                    Terms
                  </Text>
                  {' & '}
                  <Text
                    style={styles.specialText}
                    weight="bold"
                    onPress={() => {}}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </ScrollView>
            )}
          />
        )}
      </Fetch>
    );
  }
}

export default connect(null, { setUserAccessToken, setUserProfile })(
  EmailRegistrationScreen
);

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
