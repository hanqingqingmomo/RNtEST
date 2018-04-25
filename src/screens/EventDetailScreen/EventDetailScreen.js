// @flow

import React, { Component } from 'react';

import { Screen } from '../../atoms';
import EventDetail from './EventDetail';

const data = {
  community: 'Child Care Assistance Program',
  cover_photo: 'https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
  participants_count: 56,
  subtitle: '1 day ago, 3:00 AM-5:00 PM, Chicago',
  status: 'live',
  title: 'Annual Meeting Reception',
  participants: [
    {
      first_name: 'Member',
      last_name: '1',
      profile_photo:
        'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      id: 0,
      status: 'going',
    },
    {
      first_name: 'Member',
      last_name: '2',
      profile_photo:
        'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      id: 1,
      status: 'pending',
    },
    {
      first_name: 'Member',
      last_name: '3',
      profile_photo:
        'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      id: 2,
      status: 'notgoing',
    },
    {
      first_name: 'Member',
      last_name: '4',
      profile_photo:
        'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      id: 0,
      status: 'going',
    },
    {
      first_name: 'Member',
      last_name: '5',
      profile_photo:
        'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      id: 1,
      status: 'pending',
    },
    {
      first_name: 'Member',
      last_name: '6',
      profile_photo:
        'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      id: 2,
      status: 'notgoing',
    },
  ],
};

type Props = {
  navigation: any,
};

export default class EventDetailScreen extends Component<Props> {
  render() {
    return (
      <Screen fill>
        <EventDetail {...this.props} event={data} />
      </Screen>
    );
  }
}
