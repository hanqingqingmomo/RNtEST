// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';

type Context = {
  formik: *,
};

type Props = $Exact<{
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search',
  label: string,
  name: string,
  secureTextEntry?: boolean,
  title?: string,
}>;

type State = {
  initialValue?: string,
};

export default class FormField extends React.Component<void, Props, State> {
  static contextTypes: Context = {
    formik: PropTypes.object,
  };

  state = {
    initialValue: this.context.formik.values[this.props.name],
  };

  handleChange = (value: string) => {
    const { formik } = this.context;
    const { name } = this.props;
    formik.setFieldValue(name, value);
  };

  handleBlur = () => {
    const { formik } = this.context;
    const { name } = this.props;
    const { initialValue } = this.state;
    formik.setFieldTouched(name, initialValue !== formik.values[name]);
  };

  render() {
    const { name, ...props } = this.props;
    const { formik } = this.context;
    return (
      <TextField
        {...props}
        onChangeText={this.handleChange}
        onBlur={this.handleBlur}
        value={formik.values[name]}
        error={
          formik.errors[name] && formik.touched[name]
            ? formik.errors[name]
            : null
        }
      />
    );
  }
}
