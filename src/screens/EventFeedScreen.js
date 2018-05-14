// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import plural from 'plural-parens';
import { type NavigationScreenConfigProps } from 'react-navigation';

import { Screen, Text, View, CenterView, ActivityIndicator } from '../atoms';
import { EventFeed } from '../blocks';
import { getColor } from '../utils/color';
import EventFeedHeader from './EventFeedScreen/EventFeedHeader';
import { type EventProps } from '../blocks/EventFeed/Event';
import { getEvents, acceptEvent } from '../utils/requestFactory';

const EVENT_FEED_ID = 'EventFeed:Header';

type State = {
  searchValue: string,
  events: Array<EventProps>,
  busy: boolean,
};

export default class EventFeedScreen extends React.Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = props => ({
    header: <WhitePortal name={EVENT_FEED_ID} />,
  });

  state = {
    searchValue: '',
    events: [],
    busy: true,
  };

  componentWillMount() {
    this.fetch('aa');
  }

  fetch = async (query?: string) => {
    try {
      const { data } = await getEvents(query);

      if (__DEV__) {
        console.log('[Events] events', data.events);
      }

      this.setState({ events: data.events });
    } catch (err) {
      if (__DEV__) {
        console.log('[Events] error', err.message);
      }
    } finally {
      this.setState({ busy: false });
    }
  };

  _onChangeText = (searchValue: string) => {
    this.setState({ searchValue });
    this.fetch(searchValue);
  };

  _onCreateEvent = () => {
    this.props.screenProps.openModalRoute({
      routeName: 'CreateEventModal',
    });
  };

  _onActionPress = async (action: string, id: string) => {
    try {
      if (__DEV__) {
        console.log(`[Accept Event] event id: ${id}, action: ${action}`);
      }

      await acceptEvent(id, action);
      await this.fetch(this.state.searchValue);
    } catch (err) {
      if (__DEV__) {
        console.log('[Accept Event] error', err.message);
      }
    }
  };

  render(): React$Node {
    const { busy, events } = this.state;

    return busy ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
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
          {plural(`${events.length} event(s)`, events.length).toUpperCase()}
        </Text>

        {events.length ? (
          <View style={styles.container}>
            <EventFeed data={events} onActionPress={this._onActionPress} />
          </View>
        ) : null}
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
