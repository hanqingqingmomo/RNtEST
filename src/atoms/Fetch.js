// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import Fetch from 'react-fetch-component';

import { join } from '../utils/url';

export type RequestOptions = $Exact<{
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD',
  url?: false | string,
  headers?: Object,
  referrer?: string,
  referrerPolicy?: string,
  mode?: 'same-origin' | 'no-cors' | 'cors' | 'navigate',
  credentials?: 'omit' | 'same-origin' | 'include',
  redirect?: 'follow' | 'error' | 'manual',
  integrity?: string,
  cache?: 'default' | 'reload' | 'no-cache',
  body?: string | FormData,
  bodyUsed?: boolean,
}>;

// TODO type 'data' and 'response'
type RenderProp = {
  data: {},
  error?: any,
  loading: ?boolean,
  request: {
    url: string,
    options?: RequestOptions,
  },
  response: {
    ok: boolean,
    status: number,
    statusText?: string,
    // some missing
  },
  clearData: () => void,
  fetch: (url: string, RequestOptions) => void,
};

type Props = {
  url?: false | string,
  options?: RequestOptions | (RequestOptions => RequestOptions),
  as: 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text',
  cache: boolean,
  manual: boolean,
  onDataChange?: (nextData: *, currentData: *) => void | any,
  onChange?: RenderProp => void,
  children: RenderProp => React$Node,
};

function isFunction(functionToCheck) {
  var getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  );
}

export default class FetchWrapper extends Component<Props> {
  static defaultProps = {
    as: 'json',
    cache: false,
    manual: false,
  };

  static contextTypes = {
    getFetchConfig: PropTypes.func,
  };

  get options(): RequestOptions {
    const contextOptions = this.context.getFetchConfig();
    const { options } = this.props;

    if (!options) {
      return contextOptions;
    }

    if (isFunction(options)) {
      return options(contextOptions);
    }

    return contextOptions;
  }

  render() {
    return <Fetch {...this.props} options={this.options} />;
  }
}
