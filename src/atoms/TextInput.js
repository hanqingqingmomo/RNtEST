// @flow

import React from 'react';
import { TextField } from 'react-native-material-textfield';

type Props = {
  id: string,
  value: string,
  description?: string,
  label: string,
  errors?: {
    [string]: string,
  },
  touched?: {
    [string]: string,
  },
  onChangeText: (name: string, value: string) => void,
  setFieldTouched: (name: string, isTouched: boolean) => void,
};

type State = {
  initialValue: string,
};

export default class FormikReactNativeTextInput extends React.Component<
  *,
  Props,
  State
> {
  state = {
    initialValue: this.props.value,
  };

  handleChange = (value: string) => {
    this.props.onChangeText(this.props.id, value);
  };

  handleBlur = () => {
    this.props.setFieldTouched(
      this.props.id,
      this.props.value !== this.state.initialValue
    );
  };

  render() {
    const {
      id,
      onChangeText,
      errors = {},
      touched = {},
      description,
      ...otherProps
    } = this.props;

    return (
      <TextField
        onChangeText={this.handleChange}
        onBlur={this.handleBlur}
        error={errors[id] && touched[id] ? errors[id] : null}
        title={description}
        {...otherProps}
      />
    );
  }
}
