// @flow

import React, { Component } from 'react';

import { Screen } from '../../atoms';
import Form from '../../blocks/Donation/DonationForm';
import Header from '../../blocks/Donation/DonationHeader';
import { RQMakeDonation } from '../../utils/requestFactory';
import type { ScreenProps } from '../../Types';

type Props = ScreenProps<*> & {
  screenProps: Object,
};

export default class DonationAppealScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Donate',
  };

  onSuccess = async (payload: *) => {
    const response = await RQMakeDonation({
      donation: payload.donation,
      payer: payload.payer,
    });
    payload.complete(response.ok ? 'success' : 'fail');
    this.completePaymentCallback(response.ok, payload);
  };

  onPaymentFailed = () => {
    //
  };

  completePaymentCallback = (success: boolean, payload: *) => {
    this.props.navigation.navigate('DonationResultScreen', {
      amount: payload.donation.amount,
      recurrent: payload.donation.interval !== 'one-time',
      success,
      inviteFriends: () =>
        this.props.screenProps.openModalRoute({
          routeName: 'InviteFriendModal',
        }),
      repeatPayment:
        payload.method === 'credit-card' ? () => this.onSuccess(payload) : null,
    });
  };

  render() {
    return (
      <Screen fill>
        <Header />
        <Form onSuccess={this.onSuccess} onFailure={this.onPaymentFailed} />
      </Screen>
    );
  }
}
