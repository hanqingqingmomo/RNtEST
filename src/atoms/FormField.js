// @flow

import React from 'react';
import { Field } from 'formik';

import { TextInput, View } from './index';
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
  },
};

type FormFieldProps = TextInputProps & {
  name: string,
  label: string,
};

class FormFieldInner extends React.Component<void, FormikFieldProps, void> {
  onChangeText = (value: any) => {
    this.props.form.setFieldValue(this.props.field.name, value);
  };

  render() {
    return (
      <TextInput
        {...this.props}
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
