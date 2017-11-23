// @flow

import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import { PaymentRequest } from 'react-native-payments';

import { Screen, Fetch, Text } from '../../atoms';
import Form, { type Payment } from '../../blocks/Donation/DonationForm';
import Header from '../../blocks/Donation/DonationHeader';
import {
  paymentMethods,
  paymentDetails,
  paymentOptions,
} from './paymentConfig';
import { makeDonationRq } from '../../utils/requestFactory';
import type { ScreenProps, FetchProps } from '../../Types';

type Props = ScreenProps<*> & {
  screenProps: Object,
};

export default class DonationAppealScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Donation Form',
  };

  onPaymentNonceReceived = (fetchProps: *) => async (
    paymentToken: *,
    payment: *
  ) => {
    const req = makeDonationRq({
      ...payment,
      payment_method_nonce: paymentToken,
    });

    const donationResponse = await fetchProps.fetch(req.url, req.options);
    this.completePaymentCallback({ donationResponse, fetchProps, payment });
  };

  onPaymentFailed = () => {
    //
  };

  initiatePayment = (
    fetchProps: *,
    completePaymentCallback: Function
  ) => async (payment: Payment) => {
    const paymentRequest = new PaymentRequest(
      paymentMethods,
      paymentDetails(payment),
      paymentOptions
    );

    try {
      var paymentResponse = await paymentRequest.show();
      const { paymentToken } = paymentResponse.details;
      const req = makeDonationRq({
        ...payment,
        payment_method_nonce: paymentToken,
      });

      const donationResponse = await fetchProps.fetch(req.url, req.options);
      paymentResponse.complete(
        donationResponse.response.ok ? 'success' : 'fail'
      );
      completePaymentCallback({ donationResponse, fetchProps, payment });
    } catch (err) {
      if (err.message !== 'AbortError') {
        NativeModules.ReactNativePayments.complete('fail', () => {});
      }
    }
  };

  completePaymentCallback = ({
    donationResponse,
    fetchProps,
    payment,
  }: Object) => {
    this.props.navigation.navigate('DonationResultScreen', {
      amount: payment.amount,
      recurrent: payment.interval !== 'one-time',
      success: donationResponse.response.ok,
      inviteFriends: () =>
        this.props.screenProps.openModalRoute({
          routeName: 'InviteFriendModal',
        }),
      repeatPayment: () => {
        this.initiatePayment(fetchProps, this.completePaymentCallback)(payment);
      },
    });
  };

  render() {
    return (
      <Fetch manual>
        {(fetchProps: FetchProps<*>) => (
          <Screen fill>
            <Header />
            <Form
              onPaymentNonceReceived={this.onPaymentNonceReceived(fetchProps)}
              onFail={this.onPaymentFailed}
              onInitiatePayment={this.initiatePayment(
                fetchProps,
                this.completePaymentCallback
              )}
            />
          </Screen>
        )}
      </Fetch>
    );
  }
}
