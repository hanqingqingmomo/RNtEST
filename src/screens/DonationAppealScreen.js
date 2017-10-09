// @flow

import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { DonationForm, DonationAppeal } from '../blocks';
import { View, CommunityHeader, ScrollView, Screen } from '../atoms';

export default class DonationAppealScreen extends Component<{}, void> {
  static navigationOptions = {
    title: 'Donation Form',
  };

  state = {
    showDonationAppeal: true,
  };

  onClose = () => {
    this.setState({ showDonationAppeal: false });
  };

  render() {
    return (
      <Screen>
        <CommunityHeader
          title="Child Care Assistance Program"
          profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
          coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
        />
        <DonationForm
          onPaymentConfirmed={payment => Alert.alert(JSON.stringify(payment))}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69, 90, 100, 0.5)',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
});
