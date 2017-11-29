// @flow

import React, { Component } from 'react';
import { NativeModules, Platform, StyleSheet } from 'react-native';

import { View } from '../../atoms';
import DonationButton from './DonationButton';
import DonationInput from './DonationInput';
import DonationCancelInfo from './DonationCancelInfo';
import { CreditCardDonationButton } from './CreditCardDonation';
import { ApplePayDonationButton } from './ApplePayDonation';
import type { Donation, PaymentMethodResponse } from './donationHelpers';

type P = {
  onSuccess: PaymentMethodResponse => mixed,
  onFailure: () => mixed,
};

type S = Donation & {
  amountTypedManualy: boolean,
  disableCardButton: boolean,
};

const AMOUNTS = [25, 50, 100, 250];

export const INTERVALS = [
  { label: 'One time', value: 'one-time' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Annually', value: 'annually' },
];

function printMoney(amount: number): string {
  return `$${amount}`;
}

export default class DonationForm extends Component<P, S> {
  state = {
    interval: 'one-time',
    amount: 50,
    amountTypedManualy: false,
    disableCardButton: false,
  };

  get paymentDetails(): Donation {
    return {
      amount: this.state.amount,
      amountTypedManualy: this.state.amountTypedManualy,
      interval: this.state.interval,
    };
  }

  onFailure = (err: Error) => {
    if (__DEV__) {
      console.log('failure:', err.message, err);
    }
  };

  render() {
    return (
      <View style={style.container}>
        <View>
          <View style={style.buttonContainer}>
            {AMOUNTS.map(amount => (
              <View
                style={[style.button, { width: `${100 / AMOUNTS.length}%` }]}
                key={amount}
              >
                <DonationButton
                  title={printMoney(amount)}
                  size="lg"
                  onPress={() =>
                    this.setState({ amount, amountTypedManualy: false })}
                  isActive={
                    !this.state.amountTypedManualy &&
                    this.state.amount === amount
                  }
                />
              </View>
            ))}
          </View>

          <View style={style.buttonContainer}>
            <View style={style.button}>
              <DonationInput
                placeholder="Other amount"
                onChangeText={amount =>
                  this.setState({
                    amount: parseInt(amount, 10),
                    amountTypedManualy: true,
                  })}
                value={
                  this.state.amountTypedManualy
                    ? (this.state.amount || '').toString()
                    : ''
                }
                size="lg"
              />
            </View>
          </View>
          <View style={style.buttonContainer}>
            {INTERVALS.map(interval => (
              <View
                style={[style.button, { width: `${100 / INTERVALS.length}%` }]}
                key={interval.value}
              >
                <DonationButton
                  title={interval.label}
                  size="sm"
                  onPress={() => this.setState({ interval: interval.value })}
                  isActive={this.state.interval === interval.value}
                />
              </View>
            ))}
          </View>
          <DonationCancelInfo chargeInterval={this.state.interval} />
        </View>

        <View>
          {Platform.OS === 'ios' &&
          NativeModules.ReactNativePayments.canMakePayments ? (
            <ApplePayDonationButton
              disabled={!this.state.amount}
              donation={{
                amount: this.state.amount,
                interval: this.state.interval,
              }}
              onSuccess={this.props.onSuccess}
              onFailure={this.onFailure}
            />
          ) : null}
          <View style={style.buttonCreditCard}>
            <CreditCardDonationButton
              disabled={!this.state.amount}
              donation={{
                amount: this.state.amount,
                interval: this.state.interval,
              }}
              onSuccess={this.props.onSuccess}
              onFailure={this.onFailure}
            />
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 15,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },

  button: {
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 7,
  },

  buttonCreditCard: {
    marginTop: 10,
  },
});
