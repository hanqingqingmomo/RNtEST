// @flow
// To learn more about `indicative`, how to use it and/or extend, see: http://indicative.adonisjs.com/

import indicative from 'indicative';

import defaultMessages from './messages';

export default {
  validateAll: (
    values: Object,
    rules: Object,
    messages: Object = {}
  ): Promise<*> => {
    return indicative.validateAll(values, rules, {
      ...defaultMessages,
      messages,
    });
  },
};
