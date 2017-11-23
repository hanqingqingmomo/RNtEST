// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  Button,
  Form,
  FormField,
  ScrollView,
  Spacer,
  View,
  Text,
} from '../atoms';
import { CountrySelector } from '../atoms/Input/CountrySelector';
import { USStateSelector } from '../atoms/Input/USStateSelector';
import { CreditCardInput } from 'CreditCardInput';
import { getColor } from '../utils/color';

const INITIAL_VALUES = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  profile_photo: null,
};

const RULES = {
  first_name: 'required',
  last_name: 'required',
  street: 'required',
  apt: 'required',
  city: 'required',
  zip: 'required',
  country: 'required',
  state: 'required_when:country,US',
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

type State = {
  errors: ?Array<string>,
  creditCard: Card,
  payer: {
    first_name: string,
    last_name: string,
    street: string,
    apt: string,
    city: string,
    zip: string,
    country: string,
    state: string,
  },
};

export default class CreditCardScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Sign Up',
  };

  state = {
    errors: null,
    creditCard: {
      number: '4111111111111111',
      expiration: '11/20',
      cvc: '111',
      isValid: true,
    },
    payer: {
      first_name: 'Andrej',
      last_name: 'Badin',
      street: 'Krastna cesticka',
      apt: '#50',
      city: 'Bratiska',
      zip: '666 66',
      country: '',
      state: '',
    },
  };

  onCreditCardChange = (creditCard: Card) => {
    this.setState({ creditCard });
  };

  handleSubmit = async (values: FormValues, form: Object) => {
    // console.log(form);
    console.log('aaa');
    // const signupReq = makeSignupRq(values);
    // const signupRes = await fetch(signupReq.url, signupReq.options);

    // if (signupRes.response.ok) {
    //   const { email, password } = values;
    //   const signinReq = makeSigninRq({ email, password });
    //   const signinRes = await fetch(signinReq.url, signinReq.options);
    //   this.props.setUserAccessToken(signinRes.data.mobile_token);

    //   const readProfileReq = makeReadProfileRq('me');
    //   const readProfileRes = await fetch(
    //     readProfileReq.url,
    //     readProfileReq.options
    //   );

    //   this.props.setUserProfile(readProfileRes.data);
    // } else {
    //   let errors = signupRes.error.message;

    //   errors = Object.keys(errors).map((key: string) => errors[key].join('\n'));

    //   this.setState({ errors });
    // }
  };

  render() {
    return (
      <Form
        initialValues={this.state.payer}
        validateOnChange
        onSubmit={this.handleSubmit}
        messages={MESSAGES}
        rules={RULES}
        render={form => {
          return (
            <ScrollView
              keyboardShouldPersistTaps="always"
              style={styles.container}
            >
              <Spacer height={50} />

              <Text size={20}>Credit Card Details</Text>
              <Spacer height={10} />
              <CreditCardInput
                values={this.state.creditCard}
                onChange={this.onCreditCardChange}
              />

              <Spacer height={50} />

              <Text size={20}>Card Holder Details</Text>
              <Spacer height={10} />
              <View flexDirection="row">
                <View flexGrow={1}>
                  <FormField label="First Name" name="first_name" />
                </View>

                <Spacer width={10} />

                <View flexGrow={1}>
                  <FormField label="Last Name" name="last_name" />
                </View>
              </View>
              <FormField label="Street" name="street" />
              <FormField label="Apt., Suite, Building (Optional)" name="apt" />

              <View flexDirection="row">
                <View flexGrow={1}>
                  <FormField label="City" name="city" />
                </View>

                <Spacer width={10} />

                <View flexGrow={1}>
                  <FormField label="ZIP" name="zip" />
                </View>
              </View>

              <CountrySelector label="Select Country" name="country" />

              {form.values.country === 'US' ? (
                <USStateSelector label="Select State" name="state" />
              ) : null}

              <Button
                disabled={
                  this.state.creditCard.isValid === false ||
                  (form.dirty && form.isValid === false)
                }
                block
                color={getColor('orange')}
                onPress={form.handleSubmit}
                size="lg"
                style={styles.button}
                textColor={getColor('white')}
                title="Donate"
              />
            </ScrollView>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  button: {
    marginVertical: 15,
  },
});
