// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';

import { Text, View } from '../../atoms';
import { type ChargeInterval } from './donationHelpers';

function chargeIntervalToMonths(chargeInterval: ChargeInterval): string {
  return {
    'one-time': 'immediately',
    monthly: '1 month',
    quarterly: '3 months',
    annually: '12 months',
  }[chargeInterval];
}

type Props = {
  chargeInterval: ChargeInterval,
};

class DonationCancelInfo extends Component<Props> {
  render() {
    return (
      <Collapsible collapsed={this.props.chargeInterval === 'one-time'}>
        <View style={{ marginVertical: 15 }}>
          <Text color="#90A4AE" size={12}>
            You will be charged every{' '}
            {chargeIntervalToMonths(this.props.chargeInterval)} from this day
            forward until canceled. To cancel or change your recurring donation
            to the YWCA Metropolitan Chicago, please email us at:
            support@poweredbyaction.org
          </Text>
        </View>
      </Collapsible>
    );
  }
}

export default DonationCancelInfo;
