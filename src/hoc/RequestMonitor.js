// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectIsRequestRunning, selectRequestError } from '../redux/selectors';
import {
  clearRequest,
  type RequestError,
  type RequestID,
} from '../redux/ducks/requests';

type P = {
  clearRequest: Function,
  children: Function,
  requestId: RequestID,
  requestIsRunning: boolean,
  requestError: ?RequestError,
};

@connect(
  (s, props) => ({
    requestIsRunning: selectIsRequestRunning(s, props.requestId),
    requestError: selectRequestError(s, props.requestId),
  }),
  d => bindActionCreators({ clearRequest }, d)
)
export default class RequestMonitor extends React.Component<*, P, *> {
  componentWillMount() {
    this.props.clearRequest(this.props.requestId);
  }

  componentWillUnmount() {
    this.props.clearRequest(this.props.requestId);
  }

  render() {
    return this.props.children({
      requestIsRunning: this.props.requestIsRunning,
      requestError: this.props.requestError,
    });
  }
}
