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

  initiatePayment = (fetchProps: *) => async (payment: Payment) => {
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
    } catch (err) {
      if (err.message === 'AbortError') {
        // TODO log payment failure message
      }
    }
  };

  render() {
    return (
      <Fetch manual>
        {fetchProps => {
          return (
            <Screen fill>
              <CommunityHeader
                title="Child Care Assistance Program"
                profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
                coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
              />
              <DonationForm
                onInitiatePayment={this.initiatePayment(fetchProps)}
              />
            </Screen>
          );
        }}
      </Fetch>
    );
  }
}
