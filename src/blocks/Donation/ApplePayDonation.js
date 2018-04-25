// @flow

import React from 'react';
import { Platform } from 'react-native';

import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import DonationButton from './DonationButton';
import {
  execApplePayPayment,
  type Donation,
  type PaymentMethodResponse,
} from './donationHelpers';

type Props = {
  donation: Donation,
  disabled: boolean,
  onSuccess: PaymentMethodResponse => mixed,
  onFailure: any => mixed,
};

export class ApplePayDonationButton extends React.Component<Props> {
  static defaultProps = {
    disabled: true,
  };

  initiatePayment = async () => {
    try {
      const response = await execApplePayPayment(this.props.donation);
      this.props.onSuccess(response);
    } catch (err) {
      this.props.onFailure(err);
    }
  };

  render(): React$Node {
    return (
      <DonationButton
        title="Donate with"
        size="md"
        onPress={this.initiatePayment}
        textColor={{ color: getColor('white') }}
        disabled={this.props.disabled}
        icon={Platform.select({
          ios: 'apple-pay',
          android: 'android-pay',
        })}
        style={[
          {
            backgroundColor: getColor('black'),
            borderColor: getColor('black'),
          },
          css('height', 48),
        ]}
      />
    );
  }
}
