// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../atoms';
import { getColor } from '../../utils/color';
import DonationButton from './DonationButton';
import DonationInput from './DonationInput';

export type Payment = {
  amount: number,
  interval: 'one-time' | 'monthly' | 'quarterly' | 'annually',
};

type P = {
  onInitiatePayment: (payment: Payment) => any,
};

type S = Payment & {
  amountTypedManualy: boolean,
};

const AMOUNTS = [25, 50, 100, 250];
const INTERVALS = [
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
    interval: 'monthly',
    amount: 50,
    amountTypedManualy: false,
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
        </View>

        <DonationButton
          title="Donate with"
          icon="apple-pay"
          size="md"
          onPress={this.initiatePayment}
          style={{
            backgroundColor: getColor('black'),
            borderColor: getColor('black'),
          }}
          textColor={{ color: getColor('white') }}
          disabled={!this.state.amount}
        />
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
});
