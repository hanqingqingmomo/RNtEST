// @flow

import React from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Braintree from 'react-native-braintree-xplat';
import { flatten, unflatten } from 'flat';

import {
  Button,
  Form,
  FormField,
  Icon,
  ScrollView,
  Spacer,
  Text,
  View,
} from '../../atoms';
import { CardInput } from '../../atoms/Input/CreditCard/CardInput';
import { CountrySelector } from '../../atoms/Input/CountrySelector';
import { USStateSelector } from '../../atoms/Input/USStateSelector';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { readBraintreeClientTokenReq } from '../../utils/requestFactory';
import DonationButton from './DonationButton';
import type { Payer, PaymentMethodResponse, Donation } from './donationHelpers';

type Props = {
  donation: Donation,
  disabled: boolean,
  onSuccess: PaymentMethodResponse => mixed,
  onFailure: any => mixed,
};

type State = {
  active: boolean,
  busy: boolean,
};

const timeout = ms => new Promise(res => setTimeout(res, ms));

const INITIAL_VALUES = flatten({
  card: {
    number: '',
    expiration: '',
    cvv: '',
  },
  payer: {
    first_name: '',
    last_name: '',
    street: '',
    apt: '',
    city: '',
    zip: '',
    country: '',
    state: '',
  },
});

const RULES = {
  'payer.first_name': 'required',
  'payer.last_name': 'required',
  'payer.street': 'required',
  'payer.apt': 'required',
  'payer.city': 'required',
  'payer.zip': 'required',
  'payer.country': 'required',
  'payer.state': 'required_when:country,US',
};

const MESSAGES = {};

export class CreditCardDonationButton extends React.Component<Props, State> {
  state = {
    active: true,
    busy: false,
  };

  initiatePayment = () => {
    this.setState({ active: true });
  };

  cancelPayment = () => {
    this.setState({ active: false });
  };

  handleSubmit = async (values: Payer, form: Object) => {
    this.setState({ busy: true });
    // TODO extract to helper
    const response = await readBraintreeClientTokenReq();

    if (response.ok) {
      // TODO move to componentDidMount so that we have more time to initialize Braintree
      await Braintree.setup(response.data.data.clientToken);

      // TODO: hack (https://github.com/kraffslol/react-native-braintree-xplat/issues/64)
      if (Platform.OS === 'android') {
        await timeout(2000);
      }

      try {
        const { card, payer } = unflatten(values);
        const paymentNonce: string = await Braintree.getCardNonce({
          number: card.number,
          cvv: card.cvv,
          expirationDate: card.expiration,
          postalCode: payer.zip,
          streetAddress: payer.street,
        });

        this.props.onSuccess({
          donation: {
            payment_method_nonce: paymentNonce,
            amount: this.props.donation.amount,
            interval: this.props.donation.interval,
          },
          payer,
          complete: status => console.log('complete: ', status),
          method: 'credit-card',
        });
      } catch (err) {
        this.props.onFailure(err);
      } finally {
        this.setState({ active: false });
      }
    } else {
      // TODO display dropdown alert
      this.props.onFailure(response.data);
    }

    this.setState({ busy: false });
  };

  renderCardDetails(): React$Node {
    return (
      <View>
        <Text size={20}>Card Details</Text>
        <CardInput
          names={{
            number: 'card.number',
            expiration: 'card.expiration',
            cvv: 'card.cvv',
          }}
        />
      </View>
    );
  }

  renderCardholderDetails(formik: *): React$Node {
    return (
      <View>
        <Text size={20}>Card Holder Details</Text>
        <Spacer height={10} />
        <View flexDirection="row">
          <View flexGrow={1}>
            <FormField label="First Name" name="payer.first_name" />
          </View>

          <Spacer width={10} />

          <View flexGrow={1}>
            <FormField label="Last Name" name="payer.last_name" />
          </View>
        </View>
        <FormField label="Street" name="payer.street" />
        <FormField label="Apt., Suite, Building (Optional)" name="payer.apt" />

        <View flexDirection="row">
          <View flexGrow={1}>
            <FormField label="City" name="payer.city" />
          </View>

          <Spacer width={10} />

          <View flexGrow={1}>
            <FormField label="ZIP" name="payer.zip" />
          </View>
        </View>

        <CountrySelector label="Select Country" name="payer.country" />

        {formik.values.country === 'US' ? (
          <USStateSelector label="Select State" name="payer.state" />
        ) : null}
      </View>
    );
  }

  render(): React$Node {
    return (
      <View>
        <DonationButton
          disabled={this.props.disabled}
          title="Donate with Credit Card"
          size="md"
          onPress={this.initiatePayment}
          style={[css('backgroundColor', 'transparent'), css('borderWidth', 0)]}
          textColor={{ color: getColor('orange') }}
        />
        <Modal
          visible={this.state.active}
          animationType="slide"
          onRequestClose={this.cancelPayment}
        >
          <Form
            initialValues={INITIAL_VALUES}
            initialIsValid={true}
            validateOnChange
            onSubmit={this.handleSubmit}
            messages={MESSAGES}
            rules={RULES}
            render={formik => {
              return (
                <ScrollView
                  alwaysBounceVertical={false}
                  keyboardShouldPersistTaps="always"
                  style={styles.container}
                  contentContainerStyle={{ minHeight: '100%' }}
                >
                  <Spacer height={40} />
                  {this.renderCardDetails()}

                  <Spacer height={50} />
                  {this.renderCardholderDetails(formik)}

                  <TouchableOpacity
                    style={{
                      padding: 10,
                      position: 'absolute',
                      top: 30,
                      right: 0,
                    }}
                    onPress={this.cancelPayment}
                  >
                    <Icon name="close" size={24} color="gray" />
                  </TouchableOpacity>

                  <Button
                    disabled={
                      this.state.busy ||
                      CardInput.isValid(unflatten(formik.values).card) ===
                        false ||
                      (formik.dirty && formik.isValid === false)
                    }
                    block
                    color={getColor('orange')}
                    onPress={formik.handleSubmit}
                    size="lg"
                    style={styles.button}
                    textColor={getColor('white')}
                    title={this.state.busy ? 'Donate...' : 'Donate'}
                  />
                </ScrollView>
              );
            }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  button: {
    marginVertical: 15,
  },
});
