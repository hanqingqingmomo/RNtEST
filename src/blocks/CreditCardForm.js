// @flow

import React from 'react';

import { View, Text } from '../atoms';
import CreditCardInput from '../atoms/Input/CreditCard/CreditCardInput';
type State = {
  firstName: string,
  lastName: string,
};

type Props = {
  onChange: State => mixed,
};

export default class CreditCardForm extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>cc form</Text>
      </View>
    );
  }
}
