// @flow

import * as React from 'react';

type Props<T> = {
  promise: Promise<T>,
};

type State<T> = {
  value?: T,
};

export class Await extends React.Component<Props, State> {
  state = {
    value: undefined,
  };

  constructor(props) {
    super(props);
    this.awaitValue(props.promise);
  }

  awaitValue = async (promise: Promise<any>) => {
    this.setState({ value: await promise });
  };

  render() {
    return this.state.value === undefined
      ? null
      : this.props.render(this.state.value);
  }
}
