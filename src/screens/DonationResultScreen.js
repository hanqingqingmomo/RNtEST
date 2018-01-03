// @flow

import React, { Component } from 'react';

import type { ScreenProps } from '../Types';
import { Screen } from '../atoms';
import { DonationResult } from '../blocks';

type NavigationProps = {
  params: {
    amount: any,
    inviteFriends: Function,
    recurrent: any,
    repeatPayment: ?Function,
    success: boolean,
  },
};

type Props = ScreenProps<NavigationProps>;

export default class DonationResultScreen extends Component<Props> {
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
    if (this.props.navigation.state.params.repeatPayment) {
      this.props.navigation.state.params.repeatPayment();
    }
  };

  render() {
    const { amount, recurrent, success } = this.props.navigation.state.params;

    const actions = {
      inviteFriends: this.inviteFriends,
      doItLater: this.doItLater,
      tryAgain: this.props.navigation.state.params.repeatPayment
        ? this.tryAgain
        : null,
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
