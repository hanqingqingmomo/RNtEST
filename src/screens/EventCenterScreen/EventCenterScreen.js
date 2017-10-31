// @flow

import React, { Component } from 'react';

import { Screen } from '../../atoms';
import Event from './Event';

type Props = {
  navigation: any,
};

export default class EventCenterScreen extends Component<Props, State> {
  render() {
    return (
      <Screen fill>
        <Event {...this.props} />
      </Screen>
    );
  }
}
