// @flow

import React from 'react';
import PropTypes from 'prop-types';

import { selectAccessToken } from '../redux/selectors';

type Props = {
  store: {
    getState: () => Object,
  },
  children: React$Node,
};

export default class FetchProvider extends React.Component<Props> {
  static childContextTypes = {
    getFetchConfig: PropTypes.func,
  };

  getChildContext() {
    return {
      getFetchConfig: this.getFetchConfig,
    };
  }

  getFetchConfig = () => {
    const headers = {};

    const accessToken = selectAccessToken(this.props.store.getState());
    if (accessToken) {
      headers['API-KEY'] = accessToken;
    }

    return {
      headers,
    };
  };

  render() {
    return React.Children.only(this.props.children);
  }
}
