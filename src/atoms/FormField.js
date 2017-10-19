// @flow

import React, { Component } from 'react';
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
  onChangeText?: (value: string) => void,
};

type FormFieldProps = TextInputProps & {
  name: string,
  label: string,
  onChangeText?: (value: string) => void,
};

class FormFieldInner extends Component<FormikFieldProps> {
  onChangeText = (value: string) => {
    this.props.form.setFieldValue(this.props.field.name, value);
    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
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

export default class FormField extends Component<FormFieldProps> {
  render() {
    return (
      <Field
        component={this.props.component || FormFieldInner}
        {...this.props}
      />
    );
  }
}
