// @flow

import React, { Component } from 'react';
import { PaymentRequest } from 'react-native-payments';

import { CommunityHeader, Screen, Fetch } from '../../atoms';
import DonationForm, {
  type Payment,
} from '../../blocks/DonationForm/DonationForm';
import { paymentMethods, paymentDetails } from './paymentConfig';
import { makeDonationRq } from '../../utils/requestFactory';

export default class DonationAppealScreen extends Component<{}> {
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
      paymentDetails(payment)
    );

    try {
      const paymentResponse = await paymentRequest.show();
      const { paymentToken } = paymentResponse.details;
      const req = makeDonationRq({
        ...payment,
        payment_method_nonce: paymentToken,
      });

      if (!paymentToken) {
        throw new Error('Missing Braintree nonce');
      }

      const donationResponse = await fetchProps.fetch(req.url, req.options);
      paymentResponse.complete(
        donationResponse.response.ok ? 'success' : 'fail'
      );
      completePaymentCallback({ donationResponse, fetchProps, payment });
    } catch (err) {
      if (err.message !== 'AbortError') {
        throw err;
      }
    }
  };

  completePaymentCallback = ({ donationResponse, fetchProps, payment }) => {
    setTimeout(() => {
      this.props.navigation.navigate('DonationResultScreen', {
        amount: payment.amount,
        recurrent: payment.interval !== 'one-time',
        success: donationResponse.response.ok,
        inviteFriends: () =>
          this.props.screenProps.openModalRoute({
            routeName: 'InviteFriendModal',
          }),
        repeatPayment: () => {
          this.initiatePayment(fetchProps, this.completePaymentCallback)(
            payment
          );
        },
      });
    }, 1350);
  };

  render() {
    return (
      <Fetch manual>
        {fetchProps => {
          return (
            <Screen fill>
              <CommunityHeader
                title="The Future is Female"
                subtitle="Help us in creating a future where ALL women thrive. Make a donation today."
                profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
                coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
              />
              <DonationForm
                onPaymentNonceReceived={this.onPaymentNonceReceived(fetchProps)}
                onFail={this.onPaymentFailed}
                onInitiatePayment={this.initiatePayment(
                  fetchProps,
                  this.completePaymentCallback
                )}
              />
            </Screen>
          );
        }}
      </Fetch>
    );
  }
}
