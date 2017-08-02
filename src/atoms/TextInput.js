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
  onBlur?: () => *,
  onChangeText?: *,
  setFieldTouched?: *,
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
    const { id, onChangeText } = this.props;
    onChangeText && onChangeText(id, value);
  };

  handleBlur = () => {
    const { id, onBlur, value, setFieldTouched } = this.props;

    setFieldTouched && setFieldTouched(id, value !== this.state.initialValue);
    onBlur && onBlur();
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
        {...otherProps}
        error={errors[id] && touched[id] ? errors[id] : null}
        title={description}
        onChangeText={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}
