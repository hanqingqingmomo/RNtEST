// @flow

import React from 'react';
import PropTypes from 'prop-types';
import valid from 'card-validator';

import { Spacer, View } from '../../index';
import { NumberInput } from './NumberInput';
import { ExpirationInput } from './ExpirationInput';
import { CVVInput } from './CVVInput';

type CardValues = {
  number: string,
  expiration: string,
  cvv: string,
};

type Props = {
  names: {
    number: string,
    expiration: string,
    cvv: string,
  },
};

export class CardInput extends React.Component<Props> {
  static contextTypes = {
    formik: PropTypes.object,
  };

  static isValid(card: CardValues) {
    return (
      valid.number(card.number).isValid &&
      valid.expirationDate(card.expiration).isValid &&
      valid.cvv(card.cvv).isValid
    );
  }

  get values(): CardValues {
    const { formik } = this.context;
    const { names } = this.props;
    return {
      number: formik.values[names.number],
      expiration: formik.values[names.expiration],
      cvv: formik.values[names.cvv],
    };
  }

  render(): React$Node {
    const { names } = this.props;
    const { card } = valid.number(this.values.number);
    return (
      <View style={{ width: '100%' }}>
        <NumberInput
          name={names.number}
          label="Card Number"
          size={card ? Math.max(...card.lengths) + card.gaps.length : 19}
        />

        <View flexDirection="row">
          <View flexGrow={1}>
            <ExpirationInput
              name={names.expiration}
              label="Expiration"
              size={7}
            />
          </View>

          <Spacer width={10} />

          <View flexGrow={1}>
            <CVVInput
              name={names.cvv}
              label={card ? card.code.name : 'CVV'}
              size={card ? card.code.size : 4}
            />
          </View>
        </View>
      </View>
    );
  }
}
