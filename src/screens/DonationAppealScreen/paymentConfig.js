// @flow

import Config from 'react-native-config';

import { type Payment } from '../../blocks/DonationForm/DonationForm';

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
  // TODO remove label from call sites as well
  const label = {
    'one-time': 'One time donation payment',
    monthly: 'Monthly donation payment',
    quarterly: 'Quarterly donation payment',
    annually: 'Annually donation payment',
  }[payment.interval];

  return {
    id: 'ywca-donation',
    displayItems: [
      {
        label: 'Donation',
        amount: { currency, value },
      },
    ],
    total: {
      label: 'YWCA',
      amount: { currency, value },
    },
  };
}
