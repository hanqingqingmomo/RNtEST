/**
 * @flow
 * @providesModule CreditCardInput
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import valid from 'card-validator';

import { NumberInput } from './NumberInput';
import { CVCInput } from './CVCInput';
import { ExpirationInput } from './ExpirationInput';

function validate(name, value) {
  return {
    number: valid.number,
    expiration: valid.expirationDate,
    cvc: valid.cvv,
  }[name](value);
}

/**
 * Number, CVC, Expiration input
 */
// type InputProps = {
//   value: string,
//   onChange: string => mixed,
// };

/**
 * Public component
 */

export type Card = {
  number: ?string,
  cvc: ?string,
  expiration: ?string,
};

export type Props = {
  values: Card,
  onChange: Card => mixed,
};

type State = {
  focused: ?$Keys<Card>,
};

export class CreditCardInput extends React.Component<Props, State> {
  state = {
    focused: null,
  };

  r = {};

  ref = (name: $Keys<Card>) => (ref: string) => {
    this.r[name] = ref;
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (this.state.focused) {
      this.r[this.state.focused].focus();
    }
  };

  onChangeText = (name: $Keys<Card>) => (value: string) => {
    const nextValues = {
      ...this.props.values,
      [name]: value,
    };

    const number = valid.number(nextValues.number);
    const expiration = valid.expirationDate(nextValues.expiration);
    const cvc = valid.cvv(nextValues.cvc);

    nextValues.isValid = number.isValid && cvc.isValid && expiration.isValid;

    this.props.onChange(nextValues);
    const order = ['number', 'expiration', 'cvc'];
    const validation = validate(name, value);
    if (validation.isValid) {
      const nextFocused = order[order.indexOf(name) + 1];
      this.setState({ focused: nextFocused || this.state.focused });
    }
  };

  onFocus = (name: $Keys<Card>) => () => {
    this.setState({ focused: name });
    if (name === 'number') {
      this.props.onChange({
        ...this.props.values,
        expiration: '',
        cvc: '',
      });
    }
  };

  onBlur = (name: $Keys<Card>) => () => {
    this.setState({ focused: null });
  };

  render(): React$Node {
    const { focused } = this.state;
    const { values } = this.props;

    return (
      <View style={styles.container}>
        <NumberInput
          active={focused === 'number' || focused === null}
          onBlur={this.onBlur('number')}
          onChange={this.onChangeText('number')}
          onFocus={this.onFocus('number')}
          passRef={this.ref('number')}
          value={values.number || ''}
        />

        <ExpirationInput
          active={['cvc', 'expiration'].includes(focused)}
          passRef={this.ref('expiration')}
          onFocus={this.onFocus('expiration')}
          onBlur={this.onBlur('expiration')}
          value={values.expiration || ''}
          onChange={this.onChangeText('expiration')}
        />

        <CVCInput
          active={['cvc'].includes(focused)}
          onBlur={this.onBlur('cvc')}
          onChange={this.onChangeText('cvc')}
          onFocus={this.onFocus('cvc')}
          passRef={this.ref('cvc')}
          value={values.cvc || ''}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    borderColor: '#e7e7e7',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    overflow: 'hidden',
  },
});
