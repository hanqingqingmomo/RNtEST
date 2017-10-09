// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  Button,
  Form,
  FormField,
  Icon,
  Text,
  View,
  Screen,
  ScrollView,
} from '../atoms';
import { getColor } from '../utils/color';
import { setUserAccessToken, setUserProfile } from '../redux/ducks/application';
import { api } from '../services';

const INITIAL_VALUES = {
  email: 'test@dispostable.com',
  password: 'secret',
};

type FormValues = typeof INITIAL_VALUES;

type Props = {
  authenticateRemotely: (email: string, password: string) => void,
};
type State = {
  authenticationError: ?boolean,
};

const RULES = {
  email: 'required|email',
  password: 'required',
};

class EmailAuthenticationScreen extends Component<Props, State> {
  state = {
    authenticationError: null,
  };

  navigateToPasswordResetScreen = () => {
    this.props.navigation.navigate('PasswordResetScreen');
  };

  handleFormSubmit = async (values: FormValues) => {
    const { email, password } = values;
    this.setState({ authenticationError: null });
    try {
      const userAccessToken = await api.authentication.signIn(email, password);
      this.props.setUserAccessToken(userAccessToken);

      const userProfile = await api.user.getProfile('me');
      this.props.setUserProfile(userProfile);
    } catch (err) {
      console.log(err);
      this.setState({ authenticationError: true });
    }
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

              <View style={styles.formWrapper}>
                {this.state.authenticationError ? (
                  <Text
                    color={getColor('red')}
                    style={styles.authenticationErrorText}
                  >
                    Authentication failed. Invalid email and/or password.
                  </Text>
                ) : null}
                <FormField
                  label="E-mail Address"
                  name="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <FormField label="Password" name="password" secureTextEntry />

                <Text
                  color="orange"
                  size={16}
                  onPress={this.navigateToPasswordResetScreen}
                  style={styles.forgotPasswordText}
                >
                  Forgot password?
                </Text>
              </View>
              <Button
                block
                size="lg"
                color={getColor('orange')}
                textColor={getColor('white')}
                onPress={formProps.handleSubmit}
                title="Sign In"
              />
            </View>
          )}
        />
      </Screen>
    );
  }
}

export default connect(null, { setUserAccessToken, setUserProfile })(
  EmailAuthenticationScreen
);

const styles = StyleSheet.create({
  container: {
    width: 275,
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  formWrapper: {
    paddingVertical: 30,
  },
  forgotPasswordText: {
    marginTop: 38,
  },
  authenticationErrorText: {
    position: 'absolute',
    top: -20,
  },
});
