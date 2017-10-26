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
  profile_photo: null,
};

const RULES = {
  email: 'required|email',
  first_name: 'required',
  last_name: 'required',
  password: 'required',
};

const MESSAGES = {
  email: 'Enter valid email address',
  first_name: 'Enter First name',
  last_name: 'Enter Last name',
  password: 'Enter your password',
};

type FormValues = typeof INITIAL_VALUES;

type Props = {
  setUserAccessToken: Function,
  setUserProfile: Function,
  navigation: any,
};

class EmailRegistrationScreen extends Component<Props> {
  static navigationOptions = {
    headerTitle: 'Sign Up',
  };

  state = {
    errors: null,
  };

  handleSubmit = (fetch: Function) => async (
    values: FormValues,
    form: Object
  ) => {
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
    } else {
      let errors = signupRes.error.message;

      errors = Object.keys(errors).map((key: string) => errors[key].join('\n'));

      this.setState({ errors });
    }
  };

  onAvatarChange = (setFieldValue: (string, any) => void) => (
    profile_photo: string
  ) => {
    setFieldValue('profile_photo', profile_photo);
  };

  onPasswordChange = (setFieldValue: (name: string, value: string) => void) => (
    password: string
  ) => {
    setFieldValue('password_confirmation', password);
  };

  render() {
    return (
      <Fetch manual>
        {({ loading, data, fetch }) => (
          <Form
            initialValues={INITIAL_VALUES}
            onSubmit={this.handleSubmit(fetch)}
            messages={MESSAGES}
            rules={RULES}
            render={form => (
              <ScrollView style={styles.container}>
                <Icon
                  color="orange"
                  name="mpwr-logo"
                  size={64}
                  style={styles.icon}
                />

                <Text
                  style={[styles.addText, css('color', getColor('gray'))]}
                  size={17}
                  lineHeight={20}
                >
                  Add Photo
                </Text>

                <View style={styles.picker}>
                  <AvatarPicker
                    imageURI={form.values.profile_photo}
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
                  autoCorrect={false}
                />
                <FormField
                  label="Password"
                  name="password"
                  secureTextEntry
                  onChangeText={this.onPasswordChange(form.setFieldValue)}
                />

                {loading === false && this.state.errors ? (
                  <Text color={getColor('red')}>
                    {'\n'}
                    {this.state.errors.join('\n')}
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
                    onPress={() => {
                      this.props.navigation.navigate(
                        'TermsAndConditionsScreen'
                      );
                    }}
                  >
                    Terms
                  </Text>
                  {' & '}
                  <Text
                    style={styles.specialText}
                    weight="bold"
                    onPress={() => {
                      this.props.navigation.navigate('PrivacyScreen');
                    }}
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
  icon: {
    marginVertical: 20,
  },
});
