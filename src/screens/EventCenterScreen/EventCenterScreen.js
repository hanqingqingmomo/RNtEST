// @flow

import React, { Component } from 'react';

import { Screen } from '../../atoms';
import Event from './Event';

const data = {
  community: 'Child Care Assistance Program',
  coverImageURI:
    'https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
  participants: 56,
  subtitle: '1 day ago, 3:00 AM-5:00 PM, Chicago',
  status: 'past',
  title: 'Annual Meeting Reception',
};

type Props = {
  navigation: any,
};

export default class EventCenterScreen extends Component<Props> {
  render() {
    return (
      <Screen fill>
        <Event {...this.props} event={data} />
      </Screen>
    );
  }
}
