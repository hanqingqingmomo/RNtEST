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
import { api } from '../services';
import { setUserAccessToken, setUserProfile } from '../redux/ducks/application';

type State = {
  authenticationError: ?boolean,
  avatarImageURI: ?string,
};

const INITIAL_VALUES = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  avatarImageURI: '',
};

const RULES = {
  email: 'required|email',
  first_name: 'required',
  last_name: 'required',
  password: 'required',
};

type FormValues = typeof INITIAL_VALUES;

class EmailRegistrationScreen extends Component<{}, State> {
  state = {
    avatarImageURI: null,
    authenticationError: false,
  };

  handleSubmit = async (values: FormValues) => {
    this.setState({ registrationError: false, busy: true });
    try {
      await api.authentication.signUp({
        ...values,
        password_confirmation: values.password,
        time_zone: 'Europe/Bratislava',
      });
      const userAccessToken = await api.authentication.signIn(
        values.email,
        values.password
      );
      this.props.setUserAccessToken(userAccessToken);
      const userProfile = await api.user.getProfile('me');
      this.props.setUserProfile(userProfile);
    } catch (err) {
      this.setState({ registrationError: true });
    } finally {
      this.setState({ busy: false });
    }
  };

  onAvatarChange = (avatarImageURI: string) => {
    this.setState({ avatarImageURI });
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
                imageURI={this.state.avatarImageURI}
                onChange={this.onAvatarChange}
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
            <FormField label="Password" name="password" secureTextEntry />

            {this.state.registrationError ? (
              <Text color={getColor('red')}>
                {'\n'}Registration failed. Check provided information.
              </Text>
            ) : null}

            <Button
              block
              color={getColor('orange')}
              onPress={form.handleSubmit}
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
