import React from 'react';
import { Formik } from 'formik';

import validator from '../services/validation/validator';
import defaultMessages from '../services/validation/messages';

export default class Form extends React.Component<void, void, void> {
  render() {
    const { messages, rules } = this.props;
    return (
      <Formik
        {...this.props}
        validate={
          rules ? (
            async function(values) {
              try {
                await validator.validateAll(values, rules, {
                  ...defaultMessages,
                  ...messages,
                });
              } catch (err) {
                throw err.reduce((errorBag, err) => {
                  errorBag[err.field] = err.message;
                  return errorBag;
                }, {});
              }
            }
          ) : (
            undefined
          )
        }
      />
    );
  }
}
