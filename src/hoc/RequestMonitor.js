// @flow

import React from 'react';
import { connect } from 'react-redux';

import { selectIsRequestRunning, selectRequestError } from '../redux/selectors';
import { type RequestError } from '../redux/ducks/requests';

type P = {
  children: Function,
  requestIsRunning: boolean,
  requestError: ?RequestError,
};

@connect((s, props) => ({
  requestIsRunning: selectIsRequestRunning(s, props.requestId),
  requestError: selectRequestError(s, props.requestId),
}))
export default class RequestMonitor extends React.Component<*, P, *> {
  render() {
    return this.props.children({
      requestIsRunning: this.props.requestIsRunning,
      requestError: this.props.requestError,
    });
  }
}
