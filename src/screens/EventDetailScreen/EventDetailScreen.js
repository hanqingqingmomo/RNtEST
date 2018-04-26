// @flow

import React, { Component } from 'react';

import { Screen, Tabs, View, EventHeader } from '../../atoms';
import TabAbout from './TabAbout';
import TabEventParticipants from './TabEventParticipants';
import TabEventFiles from './TabEventFiles';
import { css } from '../../utils/style';

const EVENT = {
  id: '7352d18dad46',
  name: 'Example Event name',
  description: 'Lorem ...',
  cover_photo:
    'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg',
  location: 'Chicago',
  post_in: [
    {
      id: 'ce571950f574',
      name: 'Test communitasdasdy',
    },
  ],
  rsvp: 'not_going',
  start: '2017-12-07T11:51:06+00:00',
  end: '2017-12-07T12:51:06+00:00',
  presenters_communities: [
    {
      id: '3a758fae966b',
      first_name: 'Pba',
      last_name: 'Pba',
      email: 'pba@dispostable.com',
      profile_photo:
        'https://d32f6hrwlnquvu.cloudfront.net/member_photos/150606/thumb/image.jpg?1514973923',
      members: [
        {
          id: '3a758fae966b',
          first_name: 'Pba',
          last_name: 'Pba',
          email: 'pba@dispostable.com',
          profile_photo:
            'https://d32f6hrwlnquvu.cloudfront.net/member_photos/150606/thumb/image.jpg?1514973923',
        },
      ],
    },
  ],
  presenters_contacts: [
    {
      company: 'Creative Consulting',
      emailAddresses: [
        {
          email: 'anna-haro@mac.com',
          label: 'home',
        },
      ],
      familyName: 'Bell',
      givenName: 'Kate',
      hasThumbnail: false,
      jobTitle: 'Producer',
      middleName: '',
      phoneNumbers: [
        {
          label: 'home',
          number: '555-522-8243',
        },
      ],
      postalAddresses: [
        {
          city: 'Sausalito',
          country: 'USA',
          label: 'home',
          postCode: '94965',
          region: 'CA',
          state: 'CA',
          street: '1001  Leavenworth Street',
        },
      ],
      recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
      thumbnailPath:
        'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-256.png',
    },
  ],
  privacy: 'public',
  atendees_communities: [
    {
      id: '3a758fae966b',
      first_name: 'Pba',
      last_name: 'Pba',
      email: 'pba@dispostable.com',
      profile_photo:
        'https://d32f6hrwlnquvu.cloudfront.net/member_photos/150606/thumb/image.jpg?1514973923',
      members: [
        {
          id: '3a758fae966b',
          first_name: 'Pba',
          last_name: 'Pba',
          email: 'pba@dispostable.com',
          profile_photo:
            'https://d32f6hrwlnquvu.cloudfront.net/member_photos/150606/thumb/image.jpg?1514973923',
        },
      ],
    },
  ],
  atendees_contacts: [
    {
      company: 'Creative Consulting',
      emailAddresses: [
        {
          email: 'anna-haro@mac.com',
          label: 'home',
        },
      ],
      familyName: 'Bell',
      givenName: 'Kate',
      hasThumbnail: false,
      jobTitle: 'Producer',
      middleName: '',
      phoneNumbers: [
        {
          label: 'home',
          number: '555-522-8243',
        },
      ],
      postalAddresses: [
        {
          city: 'Sausalito',
          country: 'USA',
          label: 'home',
          postCode: '94965',
          region: 'CA',
          state: 'CA',
          street: '1001  Leavenworth Street',
        },
      ],
      recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
      thumbnailPath: '',
    },
  ],
  replies: [
    {
      id: '17bcdf57b4c4',
      text_content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Habitasse platea dictumst quisque sagittis purus sit.',
      created_at: '2017-10-28T19:04:38+00:00',
      pinned: false,
      attachment: null,
      cached_url: null,
      author: {
        id: '23360b92c96c',
        first_name: 'Tom',
        last_name: 'Delonge',
        email: 'tomd@email.com',
        profile_photo:
          'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150557/thumb/8xWfh0KR_400x400.jpg?1508596012',
      },
      comments_count: 0,
      likes_count: 0,
      liked: false,
      replies: [],
    },
    {
      id: 'jkl',
      text_content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Habitasse platea dictumst quisque sagittis purus sit.',
      created_at: '2017-10-28T19:04:38+00:00',
      pinned: false,
      attachment: null,
      cached_url: null,
      author: {
        id: '23360b92c96gfdgfg',
        first_name: 'Tom',
        last_name: 'Delonge',
        email: 'tomd@email.com',
        profile_photo:
          'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150557/thumb/8xWfh0KR_400x400.jpg?1508596012',
      },
      comments_count: 0,
      likes_count: 0,
      liked: false,
      replies: [],
    },
    {
      id: 'gfdgfdsh',
      text_content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Habitasse platea dictumst quisque sagittis purus sit.',
      created_at: '2017-10-28T19:04:38+00:00',
      pinned: false,
      attachment: null,
      cached_url: null,
      author: {
        id: '23360b92c96c',
        first_name: 'Tom',
        last_name: 'Delonge',
        email: 'tomd@email.com',
        profile_photo:
          'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150557/thumb/8xWfh0KR_400x400.jpg?1508596012',
      },
      comments_count: 0,
      likes_count: 0,
      liked: false,
      replies: [],
    },
  ],
  files: [
    {
      id: '7352d18dad46',
      uri: 'path/to/file',
    },
  ],
};

type Props = {
  navigation: any,
};

type State = {
  activeTab: string,
};

export default class EventDetailScreen extends Component<Props, State> {
  state = {
    activeTab: 'About',
  };

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  render() {
    return (
      <View style={css('flex', 1)}>
        <EventHeader {...EVENT} />
        <Tabs
          activeItem={this.state.activeTab}
          onChange={this.changeActiveTab}
          items={[
            {
              label: 'About',
              component: () => <TabAbout {...EVENT} />,
            },
            // {
            //   label: `Participants (${EVENT.participants_count})`,
            //   component: () => <TabEventParticipants event={EVENT} />,
            // },
            // {
            //   label: `Files`,
            //   component: () => <TabEventFiles event={EVENT} />,
            // },
          ]}
        />
      </View>
    );
  }
}
