// @flow

import { Formik } from 'formik';

import validator from '../services/validation/validator';
import defaultMessages from '../services/validation/messages';

type P = {
  rules?: {
    [string]: string,
  },
  messages?: {
    [string]: string,
  },
};

export default function FormikFactory(config: P) {
  return Formik({
    ...config,
    validate: config.rules
      ? async function(values) {
          try {
            await validator.validate(values, config.rules, {
              ...defaultMessages,
              ...config.messages,
            });
          } catch (err) {
            throw err.reduce((errorBag, err) => {
              errorBag[err.field] = err.message;
              return errorBag;
            }, {});
          }
        }
      : undefined,
  });
}
