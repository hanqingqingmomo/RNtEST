// @flow

import React, { Component } from 'react';
import { Formik } from 'formik';

import validator from '../services/validation/validator';

type Props = {
  initialValues: {
    [string]: string,
  },
  rules?: {
    [string]: string,
  },
  messages?: {
    [string]: string,
  },
  validate?: ({
    [string]: string,
  }) => boolean | Promise<*>,
  validateOnBlur?: boolean,
  validateOnChange?: boolean,
};

type ErrorProps = {
  field: string,
  message: string,
  validation: string,
};

type Errors = {
  [string]: string,
};

export default class Form extends Component<Props> {
  makeValidator = () => {
    if (this.props.validate) {
      return this.props.validate;
    }

    const { rules, messages } = this.props;

    if (rules) {
      return async (values: { [string]: string }) => {
        try {
          await validator.validateAll(values, rules, messages);
        } catch (err) {
          const errorBag = err.reduce(
            (errorBag: Errors, err: ErrorProps): Errors => {
              errorBag[err.field] =
                (messages && messages[err.field]) || err.message;
              return errorBag;
            },
            {}
          );
          throw errorBag;
        }
      };
    }

    return undefined;
  };

  render() {
    const { messages, rules, validate, ...bag } = this.props;
    return (
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        {...bag}
        validate={this.makeValidator()}
      />
    );
  }
}
