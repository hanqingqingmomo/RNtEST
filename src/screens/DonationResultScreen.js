// @flow

import React, { Component } from 'react';

import { Screen } from '../atoms';
import { DonationResult } from '../blocks';

export default class DonationResultScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Donation Result',
  };

  tryAgain = () => {};

  spreadTheWord = () => {};

  inviteFriends = () => {};

  doItLater = () => {};

  onClose = () => {};

  render() {
    const { price, recurrent, success } = this.props.navigation.state.params;

    const actions = {
      tryAgain: this.tryAgain,
      spreadTheWord: this.spreadTheWord,
      inviteFriends: this.inviteFriends,
      doItLater: this.doItLater,
      onClose: this.onClose,
    };

    return (
      <Screen fill>
        <DonationResult
          actions={actions}
          amount={price}
          recurrent={recurrent}
          success={success}
        />
      </Screen>
    );
  }
}
