// @flow

import Config from 'react-native-config';

import { type Payment } from '../../blocks/DonationForm/DonationForm';

export const paymentMethods = [
  {
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: 'merchant.com.creatix.pba-donations',
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'USD',
      paymentMethodTokenizationParameters: {
        parameters: {
          gateway: 'braintree',
          'braintree:tokenizationKey': Config.BRAINTREE_TOKENIZATION_KEY,
        },
      },
    },
  },
  {
    supportedMethods: ['android-pay'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      currencyCode: 'USD',
      environment: Config.APP_ENV,
      paymentMethodTokenizationParameters: {
        // TODO android wallet
        tokenizationType: 'NETWORK_TOKEN',
        parameters: {
          publicKey: 'your-pubic-key',
        },
      },
    },
  },
];

export function paymentDetails(payment: Payment) {
  const value: string = payment.amount.toFixed(2);
  const currency = 'USD';

  const label = {
    'one-time': 'One time donation payment',
    monthly: 'Monthly donation payment',
    quarterly: 'Quarterly donation payment',
    annually: 'Annually donation payment',
  }[payment.interval];

  return {
    displayItems: [
      {
        label,
        amount: { currency, value },
      },
    ],
    total: {
      label: 'Total',
      amount: { currency, value },
    },
  };
}
