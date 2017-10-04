// @flow

import React from 'react';
import {
  Formik,
  type Connector,
  type FormikProps,
  type FormikBag,
} from 'formik';

type DefaultProps = {
  hello: string,
};

type Props = {
  user: {
    firstName: string,
    lastName: string,
    age: number,
  },
};

type Values = {
  firstName: string,
};

class A extends React.Component<
  DefaultProps,
  FormikProps<Props, Values>,
  void
> {
  static defaultProps = {
    hello: 'World',
  };

  render() {
    this.props.user.firstName;
    this.props.touched.firstName;
    this.props.values.firstName;
    this.props.handleSubmit;
    this.props.dirty;
    this.props.isSubmitting;
    this.props.setErrors({
      firstName: '1',
    });
    // this.props.user.firstName;
    this.props.setFieldError('firstName', '2');
    this.props.setFieldTouched('firstName', true);
    return null;
  }
}

const connector: Connector<Props, Values> = Formik({
  handleSubmit: function(values, bag) {
    bag.resetForm(1);
    values.firstNamee * 2;
  },
});

function B(props: FormikProps<Props, Values>) {
  props.user.firstName;
  props.touched.firstName;
  props.values.firstName;
  props.handleSubmit;
  props.dirty;
  props.isSubmitting;
  props.setErrors({
    firstName: '1',
  });
  props.setFieldError('firstName', '2');
  props.setFieldTouched('firstName', true);
  return null;
}

const F = connector(A);

//<F />;
