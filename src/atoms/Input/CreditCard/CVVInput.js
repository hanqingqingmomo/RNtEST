// @flow

import React from 'react';
import { Platform } from 'react-native';
import valid from 'card-validator';

import { FormField, TextInput } from '../../index';

type ValidationState = {
  isPotentiallyValid: boolean,
  isValid: boolean,
};

type Props = {
  name: string,
  label: string,
  size: number,
};

export class CVVInput extends React.Component<Props> {
  onChangeText = (formik: *) => (value: string) => {
    formik.form.setFieldValue(formik.field.name, value);
    formik.form.setFieldTouched(formik.field.name);
  };

  render(): React$Node {
    const { name, label } = this.props;
    return (
      <FormField
        name={name}
        render={formik => {
          const validation: ValidationState = valid.cvv(formik.field.value);
          return (
            <TextInput
              label={label}
              value={formik.field.value || ''}
              onChangeText={this.onChangeText(formik)}
              error={
                validation.isPotentiallyValid ? '' : `${label} is not valid`
              }
              maxLength={this.props.size}
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
