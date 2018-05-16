// @flow

import React from 'react';
import { StyleSheet, RefreshControl, DeviceEventEmitter } from 'react-native';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import plural from 'plural-parens';
import { type NavigationScreenConfigProps } from 'react-navigation';

import { Text, View, ScrollView } from '../atoms';
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
    this.fetch();
    this.addListeners();
  }

  addListeners = () => {
    DeviceEventEmitter.addListener('create event', (data: Object) => {
      this.fetch();
    });
    DeviceEventEmitter.addListener('update event', (data: Object) => {
      this.fetch();
    });
    DeviceEventEmitter.addListener('delete event', (event_id: string) => {
      this.fetch();
    });
  };

  fetch = async () => {
    try {
      const { data } = await getEvents(this.state.searchValue);

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
    this.fetch();
  };

  _onCreateEvent = () => {
    this.props.screenProps.openModalRoute({
      routeName: 'CreateEventModal',
    });
  };

  _onActionPress = async (action: string, id: string) => {
    try {
      const { data } = await acceptEvent(id, action);

      if (__DEV__) {
        console.log(
          `[Accept Event] event id: ${id}, action: ${action}, response: `,
          data
        );
      }

      if (data.error) {
        throw new Error(data.error);
      }

      await this.fetch();
    } catch (err) {
      if (__DEV__) {
        console.log('[Accept Event] error', err.message);
      }

      global.alertWithType('error', 'Oppps!', err.message);
    }
  };

  render(): React$Node {
    const { busy, events } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={busy}
            onRefresh={this.fetch}
            colors={[getColor('gray')]}
          />
        }
      >
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
            <EventFeed
              data={events}
              onActionPress={this._onActionPress}
              navigation={this.props.navigation}
            />
          </View>
        ) : null}
      </ScrollView>
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
