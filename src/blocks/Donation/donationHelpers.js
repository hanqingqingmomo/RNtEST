// @flow
import { NativeModules } from 'react-native';
import { PaymentRequest } from 'react-native-payments';
import Config from 'react-native-config';

export type CompletitionCallback = (complete: 'success' | 'fail') => mixed;

export type ChargeInterval = 'one-time' | 'monthly' | 'quarterly' | 'annually';

export type Donation = {
  amount: number,
  interval: ChargeInterval,
};

export type Payer = {
  first_name: string,
  last_name: string,
  street: string,
  apt: string,
  city: string,
  zip: string,
  country: string,
  state: string,
};

export type DonationPayload = {
  donation: Donation & { payment_method_nonce: string },
  payer: Payer,
};

export type PaymentMethodResponse = DonationPayload & {
  complete: CompletitionCallback,
  method: 'apple-pay' | 'credit-card',
};

/**
 * Apple Pay related helpers
 */

function buildAPPaymentDetails(payment: Donation) {
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

export async function execApplePayPayment(
  detail: Donation
): Promise<PaymentMethodResponse> {
  const paymentRequest = new PaymentRequest(
    [
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
    ],
    buildAPPaymentDetails(detail),
    {
      // requestPayerName: true,
      // requestPayerEmail: true,
      // requestPayerPhone: true,
    }
  );

  try {
    const paymentResponse = await paymentRequest.show();
    return {
      method: 'apple-pay',
      complete: paymentResponse.complete,
      donation: {
        payment_method_nonce: paymentResponse.details.paymentToken,
        amount: detail.amount,
        interval: detail.interval,
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
    };
  } catch (err) {
    if (err.message !== 'AbortError') {
      NativeModules.ReactNativePayments.complete('fail', () => {});
    }

    throw err;
  }
}

/**
 * Credit Card related helpers
 */

// export function execCardPayment(detail: DonationDetail) {
//   console.log('exec card');
// }
