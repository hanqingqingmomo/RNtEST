// @flow

import React from 'react';
import { Field } from 'formik';

import { TextInput } from './index';
import { type Props as TextInputProps } from './TextInput';

// Note: only props in use are documented here

type FormikFieldProps = {
  field: {
    name: any,
    value: string,
    onBlur: Object => void,
  },
  form: {
    setFieldValue: (name: string, value: any) => void,
    errors: {
      [string]: string,
    },
  },
};

type FormFieldProps = TextInputProps & {
  name: string,
  label: string,
};

class FormFieldInner extends React.Component<FormikFieldProps, void> {
  onChangeText = (value: any) => {
    this.props.form.setFieldValue(this.props.field.name, value);
  };

  render() {
    const { errors } = this.props.form;

    return (
      <TextInput
        {...this.props}
        error={errors[this.props.field.name]}
        value={this.props.field.value}
        onChangeText={this.onChangeText}
      />
    );
  }
}

export default class FormField extends React.Component<
  void,
  FormFieldProps,
  void
> {
  render() {
    return <Field component={FormFieldInner} {...this.props} />;
  }
}
