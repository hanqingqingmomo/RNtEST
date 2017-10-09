// @flow

import React, { Component } from 'react';
import { format } from 'date-fns';

import { View, TableView, Icon, Text, Image, DateCard } from '../atoms';
import { css } from '../utils/style';

const { Table, Section, Cell } = TableView;

type ItemProps = {
  city?: string,
  date?: Date,
  endDate?: Date,
  fileType?: string,
  imageURI?: string,
  isJoined?: boolean,
  startDate?: Date,
  state?: string,
  subtitle?: string,
  title: string,
  type?: string,
};

const RECENT_SEARCHES = [
  {
    id: 1,
    title: 'Drive to Thrive (UBER)',
  },
  {
    id: 2,
    title: 'Maurice Ramirez',
  },
  {
    id: 3,
    title: 'Drive to Thrive Meetup',
  },
  {
    id: 4,
    title: 'Child Care',
  },
  {
    id: 5,
    title: 'Diane Smith',
  },
  {
    id: 6,
    title: 'Lucinda Taylor',
  },
];

const RESULTS = [
  {
    id: 1,
    header: 'Conversations',

    data: [
      {
        id: 11,
        type: 'conversation',
        title: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        subtitle: 'SubLorem SubLorem SubLorem SubLorem SubLorem SubLorem',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
      },
      {
        id: 12,
        type: 'conversation',
        title: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        subtitle: 'SubLorem SubLorem SubLorem SubLorem SubLorem SubLorem',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
      },
      {
        id: 13,
        type: 'conversation',
        title: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        subtitle: 'SubLorem SubLorem SubLorem SubLorem SubLorem SubLorem',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
      },
      {
        id: 14,
        type: 'conversation',
        title: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        subtitle: 'SubLorem SubLorem SubLorem SubLorem SubLorem SubLorem',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
      },
    ],
  },
  {
    id: 2,
    header: 'Events',
    data: [
      {
        id: 21,
        type: 'event',
        title:
          'Child Care Child Care Child Care Child Care Child Care Child Care Child Care Child Care',
        startDate: new Date(2017, 10, 5, 9, 0),
        endDate: new Date(2017, 10, 5, 17, 0),
        city: 'Chicago',
        state: 'IL',
      },
      {
        id: 22,
        type: 'event',
        title: 'Child Care Meeting',
        startDate: new Date(2017, 10, 18, 9, 0),
        endDate: new Date(2017, 10, 18, 17, 0),
        city: 'Chicago',
        state: 'IL',
      },
    ],
  },
  {
    id: 3,
    header: 'Communities',
    data: [
      {
        id: 31,
        type: 'community',
        title:
          'Child Care Child Care Child Care Child Care Child Care Child Care Child Care Child Care',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
        date: new Date(2017, 10, 5, 9, 0),
        isJoined: true,
      },
      {
        id: 32,
        type: 'community',
        title: 'Child Care Meeting',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
        date: new Date(2017, 10, 18, 9, 0),
        isJoined: false,
      },
    ],
  },
  {
    id: 4,
    header: 'Files',
    data: [
      {
        id: 41,
        type: 'file',
        title:
          'Child Care Child Care Child Care Child Care Child Care Child Care Child Care Child Care',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
        fileType: 'mov',
        date: new Date(2017, 10, 5, 9, 0),
        isJoined: true,
      },
      {
        id: 42,
        type: 'file',
        title: 'Child Care Meeting',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
        fileType: 'jpg',
        date: new Date(2017, 10, 1, 9, 0),
        isJoined: false,
      },
    ],
  },
  {
    id: 5,
    header: 'People',
    data: [
      {
        id: 51,
        type: 'user',
        title: 'Charles Rourke',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
      },
      {
        id: 52,
        type: 'user',
        title: 'Cameron Jones',
        imageURI:
          'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-128.png',
      },
    ],
  },
];

export default class NewsfeedPlayground extends Component<{}> {
  renderTitle(data: ItemProps): React$Element<*> {
    return <Text color="#3E515B">{data.title}</Text>;
  }

  formatEventDate(data: ItemProps): string {
    return [
      format(data.startDate, 'MMM Qo'),
      `${format(data.startDate, 'HH:MM A')} - ${format(
        data.endDate,
        'HH:MM A'
      )}`,
      data.city,
      data.state,
    ].join(', ');
  }

  formatComunityDate(data: ItemProps): string {
    if (data.isJoined) {
      return [
        `Joined on ${format(data.date, 'MMM Qo')}`,
        format(data.date, 'YYYY'),
      ].join(', ');
    }

    return 'Not Joined';
  }

  formatFileDate(data: ItemProps): string {
    return [
      format(data.date, 'MMM Qo'),
      format(data.date, 'YYYY'),
      (data.fileType || '').toUpperCase(),
    ].join(', ');
  }

  renderSubTitle(data: ItemProps): ?string {
    switch (data.type) {
      case 'event':
        return this.formatEventDate(data);
      case 'community':
        return this.formatComunityDate(data);
      case 'file':
        return this.formatFileDate(data);
      default:
        return data.subtitle;
    }
  }

  renderImage(data: ItemProps): React$Element<*> {
    switch (data.type) {
      case 'event':
        return <DateCard size="sm" date={data.startDate} />;
      case 'user':
        return (
          <Image
            source={{ uri: data.imageURI }}
            style={{ width: 28, height: 28, borderRadius: 14 }}
          />
        );
      default:
        return (
          <Image
            source={{ uri: data.imageURI }}
            style={{ width: 28, height: 28, borderRadius: 3 }}
          />
        );
    }
  }

  render() {
    return (
      <View>
        <Table>
          <Section header="Recent Searches">
            {RECENT_SEARCHES.map(recent => (
              <Cell
                key={recent.id}
                title={this.renderTitle(recent)}
                image={<Icon name="recent" size="md" color="#3E515B" />}
              />
            ))}
          </Section>
        </Table>
        <Table>
          {RESULTS.map(section => (
            <Section key={section.id} header={section.header}>
              {section.data.map(result => (
                <Cell
                  key={result.id}
                  cellStyle={result.type === 'user' ? 'Basic' : 'Subtitle'}
                  title={this.renderTitle(result)}
                  detail={this.renderSubTitle(result)}
                  subtitleTextStyle={css('color', '#8FA2AC')}
                  disableImageResize={true}
                  image={this.renderImage(result)}
                />
              ))}
            </Section>
          ))}
        </Table>
      </View>
    );
  }
}
