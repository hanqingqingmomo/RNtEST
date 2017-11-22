// @flow

import React, { Component } from 'react';
import { NativeModules, Platform, StyleSheet } from 'react-native';
import Braintree from 'react-native-braintree-xplat';

import { View, Text } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { makeReadBTClientTokenReq } from '../../utils/requestFactory';
import DonationButton from './DonationButton';
import DonationInput from './DonationInput';
import DonationCancelInfo, { type ChargeInterval } from './DonationCancelInfo';

const timeout = ms => new Promise(res => setTimeout(res, ms));

export type Payment = {
  amount: number,
  interval: ChargeInterval,
};

type P = {
  onInitiatePayment: (payment: Payment) => mixed,
  onPaymentNonceReceived: (nonce: string, payment: Payment) => mixed,
  onFail: () => mixed,
};

type S = Payment & {
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

  get paymentDetails(): Payment {
    return {
      amount: this.state.amount,
      amountTypedManualy: this.state.amountTypedManualy,
      interval: this.state.interval,
    };
  }

  initiateCreditCardPayment = async () => {
    this.setState({ disableCardButton: true });

    const req = makeReadBTClientTokenReq();
    const res = await global.fetch(req.url, req.options);
    if (res.ok) {
      const json = await res.json();
      await Braintree.setup(json.data.clientToken);

      // TODO
      // hack: https://github.com/kraffslol/react-native-braintree-xplat/issues/64
      if (Platform.OS === 'android') {
        await timeout(1500);
      }

      try {
        const paymentNonce = await Braintree.showPaymentViewController({
          callToActionText: 'Donate now',
          tintColor: getColor('orange'),
          barBgColor: '#F7F7F7',
        });

        this.props.onPaymentNonceReceived(paymentNonce, this.paymentDetails);
      } catch (err) {
        this.props.onFail();
      }
    } else {
      this.props.onFail();
    }

    this.setState({ disableCardButton: false });
  };

  initiatePayment = () => {
    this.props.onInitiatePayment({
      amount: this.state.amount,
      interval: this.state.interval,
    });
  };

  render() {
    return (
      <View style={style.container}>
        <Text size={12} color="#90A4AE">
          YWCA Metropolitan Chicago supports more than 200,000 women and
          families in overcoming various challenges and finding personal and
          economic empowerment. You can be partner in our mission of eliminating
          racism and empowering women by making a contribution to power our
          critical work.
        </Text>
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
            <DonationButton
              title="Donate with"
              icon={Platform.select({
                ios: 'apple-pay',
                android: 'android-pay',
              })}
              size="md"
              onPress={this.initiatePayment}
              style={[
                {
                  backgroundColor: getColor('black'),
                  borderColor: getColor('black'),
                },
                css('height', 48),
              ]}
              textColor={{ color: getColor('white') }}
              disabled={!this.state.amount}
            />
          ) : null}
          <View style={style.buttonCreditCard}>
            <DonationButton
              title="Donate with Credit Card"
              size="md"
              onPress={this.initiateCreditCardPayment}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              textColor={{ color: getColor('orange') }}
              disabled={this.state.disableCardButton || !this.state.amount}
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
