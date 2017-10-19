// @flow

import React, { Component } from 'react';

import { Screen } from '../atoms';
import { DonationResult } from '../blocks';

export default class DonationResultScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Donation Result',
  };

  inviteFriends = () => {
    this.props.navigation.state.params.inviteFriends();
  };

  doItLater = () => {
    this.props.navigation.goBack();
  };

  tryAgain = () => {
    this.props.navigation.goBack();
    this.props.navigation.state.params.repeatPayment();
  };

  render() {
    const { amount, recurrent, success } = this.props.navigation.state.params;

    const actions = {
      inviteFriends: this.inviteFriends,
      doItLater: this.doItLater,
      tryAgain: this.tryAgain,
    };

    return (
      <Screen fill>
        <DonationResult
          actions={actions}
          amount={amount}
          recurrent={recurrent}
          success={success}
        />
      </Screen>
    );
  }
}
