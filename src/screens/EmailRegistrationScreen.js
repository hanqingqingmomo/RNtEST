// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

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
import type { ScreenProps } from '../Types';
import { RQReadProfile, RQSignin, RQSignup } from '../utils/requestFactory';
import { setUserAccessToken, setUserProfile } from '../redux/ducks/application';

const InitialValues = {
  first_name: 'J',
  last_name: 'W',
  email: 'test123@dispostable.com',
  password: 'password',
  password_confirmation: 'password',
  profile_photo: '',
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

type FormValues = typeof InitialValues;

type Props = ScreenProps<*> & {
  setUserAccessToken: Function,
  setUserProfile: Function,
};

type State = {
  busy: boolean,
  errors: ?Array<string>,
};

class EmailRegistrationScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Sign Up',
  };

  state = {
    busy: false,
    errors: null,
  };

  handleSubmit = async (values: FormValues, form: Object) => {
    this.setState({ busy: true });
    const signupRes = await RQSignup(values);
    if (signupRes.ok) {
      const { email, password } = values;
      const signinRes = await RQSignin({ email, password });
      this.props.setUserAccessToken(signinRes.data.mobile_token);
      const readProfileRes = await RQReadProfile('me');
      this.props.setUserProfile(readProfileRes.data);
    } else {
      let errors = signupRes.data.message;
      errors = Object.keys(errors).map((key: string) => errors[key].join('\n'));
      this.setState({ errors });
    }
    this.setState({ busy: false });
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
      <Form
        initialValues={InitialValues}
        onSubmit={this.handleSubmit}
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
              <FormField
                component={AvatarPicker}
                name="profile_photo"
                imageURI={form.values.profile_photo || null}
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

            {this.state.busy === false && this.state.errors ? (
              <Text color={getColor('red')}>
                {'\n'}
                {this.state.errors.join('\n')}
              </Text>
            ) : null}

            <Button
              block
              disabled={this.state.busy}
              color={getColor('orange')}
              onPress={form.submitForm}
              size="lg"
              style={styles.button}
              textColor={getColor('white')}
              title={this.state.busy ? 'Signing Up...' : 'Sign Up'}
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
                  this.props.navigation.navigate('TermsAndConditionsScreen');
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
