// @flow

import Config from 'react-native-config';

import { type Payment } from '../../blocks/Donation/DonationForm';

export const paymentOptions = {};

export const paymentMethods = [
  {
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: Config.APPLE_PAY_MERCHANT,
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
];

export function paymentDetails(payment: Payment) {
  const value: string = payment.amount.toFixed(2);
  const currency = 'USD';
  const label = {
    'one-time': 'One time donation',
    monthly: 'Monthly donation',
    quarterly: 'Quarterly donation',
    annually: 'Annually donation',
  }[payment.interval];

  return {
    id: 'ywca-donation',
    displayItems: [
      {
        label,
        amount: { currency, value },
      },
    ],
    total: {
      label: 'YWCA',
      amount: { currency, value },
    },
  };
}
