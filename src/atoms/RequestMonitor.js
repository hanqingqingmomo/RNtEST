// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import hoistNonReactStatic from 'hoist-non-react-statics';

import {
  clearRequest,
  type RequestProps,
  type RequestID,
} from '../redux/ducks/requests';

function selectRequestIsRunning(state: Store, requestId: RequestID): boolean {
  return state.requests.running.indexOf(requestId) > -1;
}

function selectRequestError(
  state: Store,
  requestId: RequestID
): ?$PropertyType<RequestProps, 'requestError'> {
  return state.requests.errors[requestId] || null;
}

/**
 * HOC
 */
export default function withRequestMonitor(requestId: RequestID) {
  return (WrappedComponent: *) => {
    class RequestMonitor extends Component<RequestProps> {
      componentWillMount() {
        this.props.clearRequest(requestId);
      }

      componentWillUnmount() {
        this.props.clearRequest(requestId);
      }

      render() {
        return (
          <WrappedComponent
            requestIsRunning={this.props.requestIsRunning}
            requestError={this.props.requestError}
            {...this.props}
          />
        );
      }
    }

    const connectedComponent = connect(
      state => ({
        requestIsRunning: selectRequestIsRunning(state, requestId),
        requestError: selectRequestError(state, requestId),
      }),
      (dispatch: *) => bindActionCreators({ clearRequest }, dispatch)
    )(RequestMonitor);

    return hoistNonReactStatic(connectedComponent, WrappedComponent);
  };
}
