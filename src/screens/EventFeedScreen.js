// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import plural from 'plural-parens';

import { Screen, Text, View } from '../atoms';
import { EventFeed } from '../blocks';
import { getColor } from '../utils/color';
import EventFeedHeader from './EventFeedScreen/EventFeedHeader';

const EVENT_FEED_ID = 'EventFeed:Header';

const EVENTS = [
  {
    id: '7352d18dad90',
    name: 'Example Event name 1',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2017-12-07T11:51:06+00:00',
    end: '2017-12-07T12:51:06+00:00',
    rsvp: null,
    representers: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
      {
        id: '7352d18dad91',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
      {
        id: '7352d18dad92',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
    privacy: 'public',
    atendees: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
      {
        id: '7352d18dad91',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
      {
        id: '7352d18dad92',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
  },
  {
    id: '7352d18dad94',
    name: 'Example Event name 2',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2017-12-24T11:51:06+00:00',
    end: '2017-12-24T12:51:06+00:00',
    rsvp: 'not_going',
    representers: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
    privacy: 'public',
    atendees: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
  },
  {
    id: '7352d18dad95',
    name: 'Example Event name 5',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2017-12-24T14:51:06+00:00',
    end: '2017-12-24T15:51:06+00:00',
    rsvp: 'not_going',
    representers: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
    privacy: 'public',
    atendees: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
  },
  {
    id: '7352d18dad91',
    name: 'Example Event name 3',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: 'not_going',
    representers: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
    privacy: 'public',
    atendees: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
  },
  {
    id: '7352d18dad93',
    name: 'Example Event name 4',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: null,
    representers: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
    privacy: 'public',
    atendees: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
  },
  {
    id: '7352d18dad10',
    name: 'Example Event name 7',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: 'going',
    representers: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
    privacy: 'public',
    atendees: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
  },
  {
    id: '7352d18dad11',
    name: 'Example Webinar',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: 'going',
    webinar: true,
    representers: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
    privacy: 'public',
    atendees: [
      {
        id: '7352d18dad90',
        profile_photo:
          'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
      },
    ],
  },
];

type State = {
  searchValue: string,
};

export default class EventFeedScreen extends React.Component<{}, State> {
  static navigationOptions = props => ({
    header: <WhitePortal name={EVENT_FEED_ID} />,
  });

  state = {
    searchValue: '',
  };

  _onChangeText = (searchValue: string) => {
    this.setState({ searchValue });
  };

  _onCreateEvent = () => {
    console.log('create');
  };

  render(): React$Node {
    return (
      <Screen>
        <BlackPortal name={EVENT_FEED_ID}>
          <EventFeedHeader
            {...this.props}
            onChangeText={this._onChangeText}
            onPress={this._onCreateEvent}
            searchValue={this.state.searchValue}
          />
        </BlackPortal>

        <Text
          size={12}
          color={getColor('gray')}
          weight="600"
          lineHeight={14}
          style={styles.text}
        >
          {plural(`${EVENTS.length} event(s)`, EVENTS.length).toUpperCase()}
        </Text>

        <View style={styles.container}>
          <EventFeed data={EVENTS} />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  text: {
    paddingTop: 20,
    paddingBottom: 7,
    paddingHorizontal: 10,
  },
});
