// @flow

import React from 'react';
import { Alert, StyleSheet } from 'react-native';

import { DonationForm, DonationAppeal } from '../../blocks';
import { View, CommunityHeader, ScrollView } from '../../atoms';

export default class DonationFormPlayground extends React.Component<*, *, *> {
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
      <ScrollView>
        <CommunityHeader
          title="Child Care Assistance Program"
          profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
          coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
        />
        <DonationForm
          onPaymentConfirmed={payment => Alert.alert(JSON.stringify(payment))}
        />
        {this.state.showDonationAppeal ? (
          <View style={styles.overlay}>
            <DonationAppeal onClose={this.onClose} />
          </View>
        ) : null}
      </ScrollView>
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
