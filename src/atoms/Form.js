// @flow

import React from 'react';
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
};

export default class Form extends React.Component<void, Props, void> {
  get validate(): ?(Object) => Promise<*> {
    if (this.props.validate) {
      return this.props.validate;
    }

    const { rules, messages } = this.props;

    if (rules) {
      return async values => {
        try {
          await validator.validateAll(values, rules, messages);
        } catch (err) {
          const errorBag = err.reduce((errorBag, err) => {
            errorBag[err.field] = err.message;
            return errorBag;
          }, {});
          throw errorBag;
        }
      };
    }

    return undefined;
  }

  render() {
    return <Formik {...this.props} validate={this.validate} />;
  }
}
