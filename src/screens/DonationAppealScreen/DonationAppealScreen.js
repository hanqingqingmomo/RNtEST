// @flow

import React, { Component } from 'react';

import { CommunityHeader, Screen, Fetch } from '../../atoms';
import DonationForm, {
  type Payment,
} from '../../blocks/DonationForm/DonationForm';
import { paymentMethods, paymentDetails } from './paymentConfig';
import { makeDonationRq, type Request } from '../../utils/requestFactory';

export default class DonationAppealScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Donation Form',
  };

  initiatePayment = (
    fetchProps: *,
    completePaymentCallback: Function
  ) => async (payment: Payment) => {
    const paymentRequest = new global.PaymentRequest(
      paymentMethods,
      paymentDetails(payment)
    );

    try {
      const paymentResponse = await paymentRequest.show();
      const { paymentToken } = paymentResponse.details;
      const { url, options }: Request = makeDonationRq({
        ...payment,
        payment_method_nonce: paymentToken,
      });

      // TODO improve, inject API-KEY from withing request factory
      const donationResponse = await fetchProps.fetch(url, {
        ...fetchProps.request.options,
        ...options,
      });

      paymentResponse.complete(
        donationResponse.response.ok ? 'success' : 'fail'
      );

      completePaymentCallback({ donationResponse, fetchProps, payment });
    } catch (err) {
      if (err.message === 'AbortError') {
        // TODO log payment failure message
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
                profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
                coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
              />
              <DonationForm
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
