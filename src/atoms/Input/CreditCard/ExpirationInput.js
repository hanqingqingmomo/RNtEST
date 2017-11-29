// @flow

import React from 'react';
import { Platform } from 'react-native';
import valid from 'card-validator';

import { FormField, TextInput } from '../../index';

function maskValue(value: string): string {
  return value.length === 3 ? `${value[0]}${value[1]}/${value[2]}` : value;
}

type ValidationState = {
  isPotentiallyValid: boolean,
  isValid: boolean,
  month: ?string,
  year: ?string,
};

type Props = {
  name: string,
  label: string,
  size: number,
};

export class ExpirationInput extends React.Component<Props> {
  onChangeText = (formik: *) => (value: string) => {
    const sanitizedValue = value.endsWith('/') ? value.replace('/', '') : value;
    formik.form.setFieldValue(formik.field.name, sanitizedValue);
    formik.form.setFieldTouched(formik.field.name);
  };

  render(): React$Node {
    const { name, label } = this.props;
    return (
      <FormField
        name={name}
        render={formik => {
          const valueRaw = formik.field.value || '';
          const validation: ValidationState = valid.expirationDate(valueRaw);
          return (
            <TextInput
              label={label}
              value={maskValue(valueRaw)}
              onChangeText={this.onChangeText(formik)}
              maxLength={this.props.size}
              error={
                validation.isPotentiallyValid
                  ? ''
                  : 'Expiration date is not valid'
              }
              keyboardType={Platform.select({
                ios: 'number-pad',
                android: 'numeric',
              })}
            />
          );
        }}
      />
    );
  }
}
