// @flow

import React, { Component } from 'react';
import { Alert } from 'react-native';

import { DonationForm, DonationAppealModalBox } from '../../blocks';
import { CommunityHeader, ScrollView, Screen } from '../../atoms';

type Props = {};

export default class DonationFormPlayground extends Component<Props> {
  static navigationOptions = {
    title: 'Donation Form',
  };

  render() {
    return (
      <Screen fill>
        <CommunityHeader
          title="Child Care Assistance Program"
          profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
          coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
        />
        <DonationForm
          onPaymentConfirmed={payment => Alert.alert(JSON.stringify(payment))}
        />
        <DonationAppealModalBox forceOpen onConfirm={() => {}} />
      </Screen>
    );
  }
}
