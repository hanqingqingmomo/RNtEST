// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';

import Event, { type EventProps } from './Event';
import { View, DateCard, FlatList } from '../../atoms';

type FlatListItemProps = {
  item: string,
  index: number,
};

type EventGroup = { [date: string]: Array<EventProps> };

type Props = {
  data: Array<EventProps>,
  onActionPress: (action: string, event_id: string) => void,
};

function Line() {
  return (
    <View
      style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#ddd' }}
    />
  );
}

function ItemSeparatorComponent() {
  return (
    <View style={{ paddingLeft: 71 }}>
      <Line />
    </View>
  );
}

export default class EventFeed extends Component<Props> {
  get events(): EventGroup {
    let groups = this.props.data
      .sort((event_a: EventProps, event_b: EventProps): number => {
        return event_a.webinar === event_b.webinar
          ? 0
          : event_a.webinar ? -1 : 1;
      })
      .reduce((acc: EventGroup, event: EventProps): EventGroup => {
        const date = format(event.start, 'MM/DD/YYYY');

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(event);

        return acc;
      }, {});

    return Object.keys(groups)
      .sort()
      .reduce((acc: EventGroup, key: string): EventGroup => {
        acc[key] = groups[key];

        return acc;
      }, {});
  }

  _renderItem = ({ item }: FlatListItemProps) => {
    const events = this.events[item];
    const hasWebinar = events.some(
      (event: EventProps): boolean => !!event.webinar
    );

    return (
      <View style={styles.rowContainer} key={item}>
        <View style={styles.dateColumn}>
          <DateCard date={item} size="md" highlighted={hasWebinar} />
        </View>

        <View style={styles.eventColumn}>
          <FlatList
            data={events}
            renderItem={({ item }: { item: EventProps }) => (
              <Event
                onActionPress={(action: string) => {
                  this.props.onActionPress(action, item.id);
                }}
                event={item}
              />
            )}
            keyExtractor={(event: EventProps): string => event.id}
            ItemSeparatorComponent={Line}
          />
        </View>
      </View>
    );
  };

  _keyExtractor = (date: string): string => date;

  render(): React$Node {
    return (
      <FlatList
        data={Object.keys(this.events)}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  dateColumn: {
    paddingVertical: 14,
    paddingRight: 12,
    paddingLeft: 15,
  },
  eventColumn: {
    flex: 1,
  },
});
