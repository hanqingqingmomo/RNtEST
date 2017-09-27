// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../../atoms';
import { getColor } from '../../utils/color';
import DonationButton from './DonationButton';
import DonationInput from './DonationInput';

const BUTTONS = [50, 100, 300, 500];
const INTERVALS = ['One time', 'Monthly', 'Quaterly', 'Annually'];

type PaymentMethod = 'applePay' | 'creditCard';

type P = {
  onPaymentConfirmed: ({
    paymentMethod: PaymentMethod,
    price: number,
    interval: string,
  }) => void,
};

type S = {
  price: ?number,
  interval: ?string,
  priceTypedManualy: boolean,
};

function printMoney(amount: number): string {
  return `$${amount}`;
}

export default class DonationForm extends React.Component<*, P, S> {
  state = {
    interval: 'Monthly',
    price: 50,
    priceTypedManualy: false,
  };

  onConfirm = (paymentMethod: PaymentMethod) => {
    return () => {
      this.props.onPaymentConfirmed({
        paymentMethod,
        price: parseInt(this.state.price, 10),
        interval: this.state.interval || '',
      });
    };
  };

  render() {
    return (
      <View style={style.container}>
        {this.state.showTextInput ? (
          <View style={style.inputContainer}>
            <Text>aa</Text>
          </View>
        ) : (
          <View style={style.buttonContainer}>
            {BUTTONS.map(price => (
              <View style={style.button} key={price}>
                <DonationButton
                  title={printMoney(price)}
                  size="lg"
                  onPress={() =>
                    this.setState({ price, priceTypedManualy: false })}
                  isActive={
                    !this.state.priceTypedManualy && this.state.price === price
                  }
                />
              </View>
            ))}
          </View>
        )}
        <View style={style.buttonContainer}>
          <View style={style.button}>
            <DonationInput
              placeholder="Other amount"
              onChangeText={price =>
                this.setState({ price, priceTypedManualy: true })}
              value={
                this.state.priceTypedManualy ? (
                  (this.state.price || '').toString()
                ) : (
                  ''
                )
              }
              size="lg"
            />
          </View>
        </View>
        <View style={style.buttonContainer}>
          {INTERVALS.map(interval => (
            <View style={style.button} key={interval}>
              <DonationButton
                title={interval}
                size="sm"
                onPress={() => this.setState({ interval })}
                isActive={this.state.interval === interval}
              />
            </View>
          ))}
        </View>

        <View style={style.buttonApplePay}>
          <DonationButton
            title="Donate with"
            icon="apple-pay"
            size="md"
            onPress={this.onConfirm('applePay')}
            style={{
              backgroundColor: getColor('black'),
              color: getColor('white'),
              borderColor: getColor('black'),
            }}
            disabled={!this.state.price}
          />
        </View>

        <View style={style.buttonCreditCard}>
          <DonationButton
            title="Donate with Credit Card"
            size="md"
            onPress={this.onConfirm('creditCard')}
            style={{
              backgroundColor: 'transparent',
              color: getColor('orange'),
              borderWidth: 0,
            }}
            disabled={!this.state.price}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  contentTop: {},
  contentBottom: {},
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  inputContainer: {},
  button: {
    flexGrow: 1,
    paddingHorizontal: 4,
    paddingVertical: 7,
  },
  buttonApplePay: { marginTop: 30 },
  buttonCreditCard: { marginVertical: 10 },
});
