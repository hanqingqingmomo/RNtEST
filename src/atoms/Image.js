// @flow

import React, { Component } from 'react';
import { Image as RNImage } from 'react-native';

// TODO remove this component when backend is fixed and does not return NULL instead of image uri

export default class Image extends Component<{}> {
  render() {
    let { source, ...rest } = this.props;

    source = source.uri === null ? undefined : source;

    return <RNImage source={source} {...rest} />;
  }
}
