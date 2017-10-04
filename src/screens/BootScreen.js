// @flow

import React from 'react';

import { ActivityIndicator, CenterView } from '../atoms';

export default class BootScreen extends React.Component {
  render() {
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }
}
